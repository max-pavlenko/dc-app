import {bindActionCreators, combineReducers, configureStore} from '@reduxjs/toolkit';
import authReducer from '../store/user';
import chatReducer from '../store/chat';
import friendsReducer, {friendsActions} from '../store/friends';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import thunk from 'redux-thunk';
import {authActions} from '@/store/user';
import {chatActions} from '@/store/chat';
import {authMiddleware} from '@/store/middlewares/auth.middleware';
import {actionLogMiddleware} from '@/store/middlewares/action-log.middleware';
import {invitationsApi} from '@/code/features/invitations/services/invitations.service';
import {CombinedState, Dispatch, MiddlewareAPI} from 'redux';
import {roomSlice} from '@/store/room';

const rootReducer = combineReducers({
   auth: authReducer,
   friends: friendsReducer,
   chat: chatReducer,
   room: roomSlice.reducer,
   [invitationsApi.reducerPath]: invitationsApi.reducer
});

const middlewares = [
   thunk,
   authMiddleware,
   invitationsApi.middleware,
];
if (process.env.NODE_ENV === 'development') { middlewares.push(actionLogMiddleware); }

export const store = configureStore({
   reducer: rootReducer,
   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...middlewares)
});

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = typeof store;
export type AppDispatch = AppStore['dispatch']

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const ALL_ACTIONS = {
   ...authActions,
   ...friendsActions,
   ...chatActions,
   ...roomSlice.actions,
};
export const useActions = () => {
   return bindActionCreators(ALL_ACTIONS, useAppDispatch());
};
export type AppMiddlewareAPI = MiddlewareAPI<Dispatch, CombinedState<RootState>>;
