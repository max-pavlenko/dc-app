import {bindActionCreators, combineReducers, configureStore} from "@reduxjs/toolkit";
import authReducer from '../store/user'
import chatReducer from '../store/chat'
import alertsReducer from '../store/alerts'
import friendsReducer, {friendsActions} from '../store/friends'
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import thunk from "redux-thunk";
import {authActions} from "@/store/user";
import {alertsActions} from "@/store/alerts";
import {chatActions} from "@/store/chat";
import {login} from "@/store/user/actions/thunks/login";
import {alertsMiddleware} from "@/store/middlewares/AlertsMiddleware";
import {authMiddleware} from "@/store/middlewares/AuthMiddleware";
import {register} from "@/store/user/actions/thunks/register";
import {sendFriendInvitation} from "@/store/friends/actions/thunks/sendFriendInvitation";
import {actionLogMiddleware} from "@/store/middlewares/ActionLogMiddleware";
import {invitationsApi} from "@/app/features/invitations/services/InvitationsService";
import {CombinedState, Dispatch, MiddlewareAPI} from "redux";
import {roomSlice} from "@/store/room";

const rootReducer = combineReducers({
    auth: authReducer,
    alerts: alertsReducer,
    friends: friendsReducer,
    chat: chatReducer,
    room: roomSlice.reducer,
    [invitationsApi.reducerPath]: invitationsApi.reducer
});

const middlewares = [
    thunk,
    alertsMiddleware,
    authMiddleware,
    invitationsApi.middleware,
    actionLogMiddleware
];
if (process.env.NODE_ENV === 'development') { middlewares.push(actionLogMiddleware); }

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), ...middlewares]
})

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch']

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const ALL_ACTIONS = {
    ...authActions,
    ...alertsActions,
    ...friendsActions,
    ...chatActions,
    ...roomSlice.actions,
    login,
    register,
    sendFriendInvitation,
}
export const useActions = () => {
    return bindActionCreators(ALL_ACTIONS, useAppDispatch());
}
export type AppMiddlewareAPI = MiddlewareAPI<Dispatch, CombinedState<RootState>>;
