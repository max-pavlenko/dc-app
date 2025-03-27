import {Middleware} from "redux";
import {RootState} from "@/store/store";
import toast from 'react-hot-toast';

export const actionLogMiddleware: Middleware<{}, RootState> = ({getState}) => next => (action) => {
    console.log('Dispatching action:', action, '\n - Next state:', getState());
    if (action.type.includes('rejected')) {
        toast.error(action.payload?.error ?? action.payload?.data.error, {
            duration: 4000,
        })
    }
    if (action.type.includes('fulfilled') && action.payload?.notification) {
        toast.success(action.payload?.notification, {
            duration: 3000,
        })
    }
    return next(action);
};
