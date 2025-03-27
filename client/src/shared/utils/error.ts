import {AxiosError} from 'axios';
import {ApiError} from '@/shared/types/api';

export function formatApiError(error: unknown): string {
   if (!(error instanceof AxiosError)) {
      return `An unknown error occurred: ${error}`;
   }
   if (!error.response) {
      return error.message ?? 'An unknown error occurred';
   }
   return typeof error.response?.data === 'string' ? error.response.data : (error.response.data as ApiError).error;
}
