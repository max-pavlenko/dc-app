import {Middleware} from "redux";
import {apiClient, } from "@/api/axios";
import {RootState} from "@/store/store";
import {authActions} from "@/store/user";
import {connectSocketServer} from "@/api/socket.io/connection";
import {User, UserResponse} from '@/store/user/types';
import {setCookie} from 'cookies-next';
import {CookieKey} from '@/shared/models/cookie.model';

interface AuthMiddlewareAction {
    type: string;
    payload?: {
            user: UserResponse;
            token: string;
        }
        |
        {
            data: {
                error: string;
            };
            notification: string;
            status: number;
        };
}

function isAuthPayloadSuccess(payload: Record<string, any>): payload is { user: UserResponse } {
    return typeof payload === 'object' && 'user' in payload;
}

export const authMiddleware: Middleware<{}, RootState> = (state) => next => (action: AuthMiddlewareAction) => {
    const {payload} = action;
    if (!payload) return next(action);

    const isAuthSuccessful = /auth\/.+\/fulfilled/.test(action.type);
    if (isAuthPayloadSuccess(payload) && isAuthSuccessful) {
        const {user, token} = payload;
        setCookie(CookieKey.Token, token);
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        state.dispatch({type: authActions.SET_USER.type, payload: user});
        connectSocketServer({jwtToken: token, state});
        Notification.requestPermission();
    }

    return next(action);
};
