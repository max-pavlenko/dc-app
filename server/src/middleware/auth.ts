import jwt from 'jsonwebtoken';
import {NextFunction, Request, Response} from 'express';
import {Socket} from "socket.io";
import {Error} from "mongoose";
import {ExtendedError} from "socket.io/dist/namespace";

export type User = {
    email: string,
    userID: string,
    username: string,
}

export type RequestWithUser = Request & {user: User}

export interface CustomSocket extends Socket {
    user?: User;
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    let token = req.body?.token || req.params?.token || req.headers['authorization'];
    if (!token) {
       return res.status(403).send({error: 'JWT Token is required!'});
    }

    try {
        token = token.replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as string; //@ts-ignore
        req.user = decoded;
    } catch (e) {
        console.log('token error: ' + e, token)
        return res.status(401).send({error: 'JWT Token is invalid'});
    }
    return next();
}

export function verifyTokenWebsocket(socket: CustomSocket, next: (err?: (ExtendedError | undefined)) => void){
    try {
        const token = socket.handshake.auth?.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as User;
        socket.user = decoded;
    } catch (e) {
        next(new Error('Not_Authorized'));
    }

    next();
}

export default verifyToken;
