import {Middleware} from "redux";
import {alertsActions} from "@/store/alerts/";
import {RootState} from "@/store/store";

interface AuthMiddlewareAction {
    type: string;
    payload?: {
        notificationMessage?: string;
    };
}

export const alertsMiddleware: Middleware<{}, RootState> = ({dispatch}) => next => (action: AuthMiddlewareAction) => {
    const notification = action.payload?.notificationMessage;
    if (!notification) return next(action);

    if (action.type.includes('fulfilled')) dispatch({type: alertsActions.OPEN.type, payload: {message: `Successfully ${notification}`, type: 'success'}})
    if (action.type.includes('rejected')) dispatch({type: alertsActions.OPEN.type, payload: {message: `${notification}`, type: 'error'}})

    return next(action);
};
