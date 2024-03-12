import React, { useEffect } from "react";
import { api } from "../api";
import useAuth from "./useAuth";
import axios from "axios";
export function useAxios() {
  const { auth, setAuth } = useAuth();

  console.log("Use axios  ", auth.accessToken);
  useEffect(() => {
    //Adding token in request
    const requestInterceptor = api.interceptors.request.use(
      (config) => {
        const authToken = auth?.accessToken;

        if (authToken) {
          config.headers.Authorization = `Bearer ${authToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    //Checking response & adding refresh token if needed
    const responseInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response.status == 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            const RefreshToken = auth?.refreshToken;
            const response = await axios.post(
              `${import.meta.env.VITE_BASE_URL}/auth/refresh-token`,
              { RefreshToken }
            );

            const { accessToken, refreshToken } = response.data;
            setAuth({
              ...auth,
              accessToken: accessToken,
            });
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            console.log(accessToken, "new token");
            return axios(originalRequest);
          } catch (err) {
            throw err;
          }
        }
      }
    );

    return () => {
      api.interceptors.request.eject(requestInterceptor);
      api.interceptors.response.eject(responseInterceptor);
    };
  }, [auth.accessToken]);

  return { api };
}
