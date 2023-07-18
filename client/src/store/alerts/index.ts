import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AlertProps} from "@mui/material";

export type AlertsState = {
    metadata: {
        isVisible: boolean,
        message: string,
        type: AlertProps['severity']
    }
}

const initialState: AlertsState = {
    metadata: {
        isVisible: false,
        message: '',
        type: 'info',
    },
}

const alertsSlice = createSlice({
    name: 'alerts',
    initialState,
    reducers: {
        HIDE: (state) => {
            state.metadata = {
                ...state.metadata,
                isVisible: false,
            }
        },
        CHANGE_MESSAGE: (state, {payload: {message}}: PayloadAction<{ message: string }>) => {
            state.metadata = {
                ...state.metadata,
                message,
            }
        },
        OPEN: (state, {payload: {message, type}}: PayloadAction<{ message: string, type?: AlertsState['metadata']['type'] }>) => {
            state.metadata = {
                ...state.metadata,
                message: message,
                isVisible: true,
                type: type ? type : state.metadata.type,
            }
        },
    }
})

export default alertsSlice.reducer;
export const alertsActions = alertsSlice.actions;
