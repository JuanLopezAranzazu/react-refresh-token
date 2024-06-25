import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// hooks
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";
// api
import axios from "../api/axios";

const useAxiosPrivate = () => {
  const { auth } = useAuth();
  const refreshToken = useRefreshToken();
  const navigate = useNavigate();

  useEffect(() => {
    const requestIntercept = axios.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          try {
            const newAccessToken = await refreshToken();
            prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
            return axios(prevRequest);
          } catch (err) {
            navigate("/login");
            return Promise.reject(err);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(requestIntercept);
      axios.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refreshToken, navigate]);

  return axios;
};

export default useAxiosPrivate;
