import {Middleware} from "redux";
import {RootState} from "@/store/store";
import {ENV_VARS} from "@/utils/envVariables";

export const actionLogMiddleware: Middleware<{}, RootState> = ({getState}) => next => (action) => {
    console.log('Dispatching action:', action, 'Next state:', getState());
    console.log('ENV VARIABLES', ENV_VARS);

    return next(action);
};
