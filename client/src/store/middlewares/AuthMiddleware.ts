import {Middleware} from "redux";
import {apiClient, checkLogOutResponseCode, handleLogout} from "@/api/axios";
import {RootState} from "@/store/store";
import {authActions} from "@/store/user";
import router from "@/utils/router";
import {connectSocketServer} from "@/api/socket.io/connection";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import {User} from "@/store/user/types";

export type UserWithToken = User & { token: string };

interface AuthMiddlewareAction {
    type: string;
    payload?: {
            user: UserWithToken;
        }
        |
        {
            data: {
                error: string;
            };
            notificationMessage: string;
            status: number;
        };
}

function isAuthPayloadSuccess(payload: Record<string, any>): payload is { user: UserWithToken } {
    return typeof payload === 'object' && 'user' in payload;
}

function isAuthPayloadRejected(payload: Record<string, any>): payload is FetchBaseQueryError {
    return typeof payload === 'object' && 'data' in payload && 'error' in payload.data;
}

export const authMiddleware: Middleware<{}, RootState> = (state) => next => (action: AuthMiddlewareAction) => {
    const {payload} = action;
    console.log('payload', payload)
    if (!payload) return next(action);

    const isAuthSuccessful = /auth\/.+\/fulfilled/.test(action.type);
    if (isAuthPayloadSuccess(payload) && isAuthSuccessful) {
        const {user} = payload;
        localStorage.setItem('token', user.token);
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${user.token}`;
        state.dispatch({type: authActions.SET_USER.type, payload: user});
        router.push('/dashboard');
        connectSocketServer({jwtToken: user.token, state});
        Notification.requestPermission();
    }

    const isUserUnauthorized = /.+\/executeMutation\/rejected/.test(action.type);
    if (isAuthPayloadRejected(payload) && isUserUnauthorized) {
        console.log('checkResponseCode', payload.status)
        checkLogOutResponseCode(payload.status) && handleLogout();
    }

    return next(action);
};
