import axios from 'axios'
import {deleteCookie, getCookie} from 'cookies-next';
import {CookieKey} from '@/shared/models/cookie.model';

export const apiClient = axios.create({
   baseURL: "http://localhost:5000/api",
   timeout: 2000,
});

apiClient.interceptors.request.use((config) => {
       const token = getCookie(CookieKey.Token)?.toString();

       if (token) {
          config.headers.Authorization = `Bearer ${token}`;
       }

       return config;
    },
    (err) => {
       return Promise.reject(err);
    }
);

apiClient.interceptors.response.use(config => config, async (error) => {
   if (!error.response || isUnauthorized(error.response.status)) {
      handleLogout();
      location.replace('/login');
   }
   return Promise.reject(error);
})

export function handleLogout() {
   deleteCookie(CookieKey.Token);
}

export const isUnauthorized = (responseCode: number) => {
   return (responseCode === 403);
};
