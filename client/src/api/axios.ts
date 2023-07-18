import axios from 'axios'
import router from "@/utils/router";

export const apiClient = axios.create({
   baseURL: "http://localhost:5000/api",
   timeout: 1000,
});

apiClient.interceptors.request.use(
    (config) => {
       const token = localStorage.getItem("token");

       if (token) {
          config.headers.Authorization = `Bearer ${token}`;
       }

       return config;
    },
    (err) => {
       return Promise.reject(err);
    }
);

export async function handleLogout(redirectPage: string = "/login") {
   localStorage.removeItem('token');
   await router.push(redirectPage);
}

export const checkLogOutResponseCode = (responseCode: number) => {
   return (responseCode === 401 || responseCode === 403);
};
