import User from '../schemas/User';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import {Request, Response} from 'express';

async function register(req: Request, res: Response) {
    try {
        const {username, password, email} = req.body;
        const [isUserWithSameEmailExists, isUserWithSameNameExists] = await Promise.all([User.exists({email: email.toLowerCase()}), User.exists({username: username.toLowerCase()})]);
        if (isUserWithSameEmailExists || isUserWithSameNameExists) return res.status(409).send({error: 'Email or username is already in use'})

        const encryptedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            username: username.toLowerCase(),
            email: email.toLowerCase(),
            password: encryptedPassword,
        })
        const token = jwt.sign({
            userID: user._id,
            email,
            username,
        }, process.env.JWT_SECRET!, {
            expiresIn: '24h',
        })

        return res.status(201).send({
            user: {
                token,
                userID: user._id,
                username: user.username,
                email: user.email,
            }
        })
    } catch (e) {
        console.log(e);
    }
}

async function login(req: Request, res: Response) {
    try {
        const {email, password} = req.body;

        const userFromDB = await User.findOne({email});
        if (!userFromDB) return res.status(401).send({error: 'User doesnt exist with this email'});
        const isPasswordCorrect = await bcrypt.compare(password, userFromDB.password!);
        if (!isPasswordCorrect) return res.status(401).send({error: 'Incorrect mail or password'});

        const token = jwt.sign({
            userID: userFromDB._id,
            email,
            username: userFromDB.username,
        }, process.env.JWT_SECRET!, {
            expiresIn: '24h',
        });
        return res.status(200).send({
            user: {
                token,
                userID: userFromDB._id,
                email,
                username: userFromDB?.username,
            }
        })
    } catch (e) {
        return res.status(500).send({error: 'Something went wrong...'})
    }
}

export default {register, login};
