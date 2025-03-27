import UserModel from '../schemas/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {Request, Response} from 'express';
import {User} from '../middleware/auth';
import axios from 'axios';
import {AuthProvider} from '../shared/models/auth.model';
import {sendEmail} from '../email';

async function createUser({username, password, authProvider = AuthProvider.None, email, avatar}: {
   email: string;
   username: string,
   avatar?: string;
   password?: string,
   authProvider?: AuthProvider;
}) {
   const [isUserWithSameEmailExists, isUserWithSameNameExists] = await Promise.all([UserModel.exists({email: email?.toLowerCase()}), UserModel.exists({username: username?.toLowerCase()})]);
   if (isUserWithSameEmailExists || isUserWithSameNameExists) throw new Error('Email or username is already in use');
   
   const newUserPayload = {
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      authProvider,
      ...(password && {password: await bcrypt.hash(password, 10)}),
      ...(avatar && {avatar})
   };
   const user = await UserModel.create(newUserPayload);
   
   return {
      user,
   };
}

async function signJwt(payload: Record<string, any>) {
   return jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: '72h',
   });
}

async function register(req: Request, res: Response) {
   try {
      const {user} = await createUser(req.body);
      
      return res.status(201).send({
         token: await signJwt({
            userID: user._id,
            ...user
         }),
         user: {
            userID: user._id,
            username: user.username,
            email: user.email,
         }
      });
   } catch (e: any) {
      console.log(e);
      return res.status(409).send(e.message);
   }
}

async function login(req: Request, res: Response) {
   try {
      const {email, password} = req.body;
      
      const userFromDB = await UserModel.findOne({email}).lean();
      if (!userFromDB) return res.status(403).send({error: 'User doesnt exist with this email'});
      if (!userFromDB.authProvider || userFromDB.authProvider !== AuthProvider.None) return res.status(409).send({
         error: `You tried signing in using a password, which is not the authentication method you used during sign up.
          Try again using the authentication method (${userFromDB.authProvider}).`
      });
      const isPasswordCorrect = await bcrypt.compare(password, userFromDB.password!);
      if (!isPasswordCorrect) return res.status(403).send({error: 'Incorrect mail or password'});
      
      const token = jwt.sign({
         userID: userFromDB._id,
         ...userFromDB
      }, process.env.JWT_SECRET!, {
         expiresIn: '24h',
      });
      return res.status(200).send({
         token,
         user: {
            userID: userFromDB._id,
            ...userFromDB
         }
      });
   } catch (e) {
      console.log(e);
   }
}

async function currentUser(req: Request, res: Response) {
   try {
      const token = req.headers.authorization?.replace('Bearer ', '');
      if (!token || token === 'undefined') return res.status(401).send({error: 'Unauthorized'});
      
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as User;
      return res.status(200).send({user: {...decoded}, token});
   } catch (e) {
      //malformed token
      return res.status(403).send({error: 'Unauthorized. Malformed token'});
   }
}

async function getAccessToken(authCode: string): Promise<string> {
   const response = await axios.post('https://oauth2.googleapis.com/token', {
      code: authCode,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
      redirect_uri: `${process.env.BASE_URL_FRONTEND}/api/auth/google/callback`,
      grant_type: 'authorization_code',
   });
   if (!response?.data?.access_token) {
      throw new Error('Could not get access token from Google');
   }
   return response.data.access_token;
}

async function getGoogleUserInfo(accessToken: string, code: string) {
   const response = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
      headers: {Authorization: `Bearer ${accessToken}`},
   });
   const {email, verified_email} = response.data || {};
   if (!verified_email) throw new Error('Email is not verified');
   if (!email) throw new Error('Could not get user email from Google');
   return response.data;
}

async function getGoogleProfileInfo(code: string) {
   try {
      const accessToken = await getAccessToken(code);
      return await getGoogleUserInfo(accessToken, code);
   } catch (error) {
      if (axios.isAxiosError(error) && error?.response?.data?.error === 'invalid_grant') {
         throw new Error('Invalid code');
      }
      console.error('Google login error', error);
      throw new Error('Internal server error');
   }
}

async function authWithGoogle(req: Request, res: Response) {
   try {
      const {email, verified_email, displayName, photoUrl} = await getGoogleProfileInfo(req.body.code);
      let user = await UserModel.findOne({email}).lean();
      if (!user) {
         const {user: newUser} = await createUser({
            email,
            avatar: photoUrl,
            username: displayName ?? email.slice(0, email.indexOf('@')),
            authProvider: AuthProvider.Google,
         });
         user = newUser;
      }
      
      return res.status(200).send({
         token: await signJwt({
            userID: user._id,
            ...user
         }),
         user: {
            userID: user._id,
            ...user
         }
      });
   } catch (e: any) {
      return res.status(400).send(e.message);
   }
}

export const forgotPassword = async (req: Request, res: Response) => {
   try {
      const {email} = req.body;
      
      const user = await UserModel.findOne({email});
      if (!user) {
         return res.status(200).json({message: 'Password reset email sent if account exists'});
      }
      
      if (user.authProvider !== AuthProvider.None) {
         return res.status(400).json({
            error: `This account uses ${user.authProvider} authentication. Password reset is not available.`,
         });
      }
      
      const resetTokenExpiresDate = new Date();
      resetTokenExpiresDate.setHours(resetTokenExpiresDate.getHours() + 1);
      
      const resetToken = await signJwt({email, expires: resetTokenExpiresDate.toString()});
      
      const resetUrl = `${process.env.BASE_URL_FRONTEND}/reset-password/${resetToken}`;
      
      const subject = 'Password Reset Request';
      const text = `You are receiving this email because you (or someone else) has requested to reset your password.
    
    Please click on the following link to reset your password:
    
    ${resetUrl}
    
    If you did not request this, please ignore this email and your password will remain unchanged.
    
    This link will expire in 1 hour.`;
      
      await sendEmail({
         to: user.email,
         subject,
         text,
      });
      
      res.status(200).json({message: 'Password reset email sent'});
   } catch (error) {
      console.error('Forgot password error:', error);
      res.status(500).json({error: 'Server error'});
   }
};

export const verifyResetToken = async (req: Request, res: Response) => {
   try {
      const {token} = req.body;
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { email: string; expires: string };
      
      const user = await UserModel.findOne({
         email: decoded.email,
      });
      
      if (!user || new Date(decoded.expires) < new Date()) {
         return res.status(401).json({error: 'Invalid or expired token'});
      }
      
      res.status(200).json({message: 'Token is valid'});
   } catch (error) {
      res.status(401).json({error: 'Invalid or expired token'});
   }
};

async function resetPassword(req: Request, res: Response) {
   const {token, password} = req.body;
   const {email} = jwt.verify(token, process.env.JWT_SECRET!) as { email: string };
   
   try {
      const user = await UserModel.findOne({
         email,
      });
      
      if (!user) {
         return res.status(401).json({error: 'Invalid or expired token'});
      }
      
      user.password = await bcrypt.hash(password, 10);
      await user.save();
      
      res.status(200).json({message: 'Password has been updated'});
   } catch (error) {
      res.status(401).json({error: 'Invalid or expired token'});
   }
}

export default {register, login, authWithGoogle, currentUser, forgotPassword, resetPassword, verifyResetToken};
