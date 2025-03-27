import {SerializedError} from '@reduxjs/toolkit';
import {FetchBaseQueryError} from '@reduxjs/toolkit/query';

export interface ApiError {
   error: string;
}

export function isSuccessfulMutation<T>(
    value: Record<'data', any> | { error: SerializedError | FetchBaseQueryError }
): value is Record<'data', any> {
   return !!value && typeof value === 'object' && 'data' in value && value.data !== undefined;
}

