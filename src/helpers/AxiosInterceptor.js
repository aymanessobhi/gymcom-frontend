import axios from "axios";
import config from "./config";
import { jwtDecode } from "jwt-decode";
import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NETWORK_ERROR_PAGE_ROUTE, NOT_FOUND_ERROR_PAGE_ROUTE, SERVER_ERROR_PAGE_ROUTE } from "./constants";


export const isTokenExpired = (parsedToken) => {
  return Boolean(
      parsedToken?.exp && moment.unix(parsedToken.exp).isBefore(moment())
  );
};
const instance = axios.create({
  baseURL: config.baseURL,
});


const AxiosInterceptor = ({ children }) => {
  const navigate = useNavigate();

  const [isAppReady, setIsAppReady] = React.useState(false);

  const token = JSON.parse(localStorage.getItem("authUser")).accessToken;

  const getErrorStatusAndMessage = (error) => {
    const errorStatus = error?.response?.data?.status ?? error?.response?.status;
    const errorMessage = error?.response?.data?.message;
    return [errorStatus, errorMessage];
  };

  const handleError = (errorStatus, errorMessage) => {
    if (Boolean(errorStatus)) {
      switch (String(errorStatus)) {
        case "404":
          navigate(NOT_FOUND_ERROR_PAGE_ROUTE);
          break;
        case "500":
          navigate(SERVER_ERROR_PAGE_ROUTE);
          break;
        default:
          break;
      }
    } else {
      navigate(NETWORK_ERROR_PAGE_ROUTE);
    }
  };

  const configuration = (config) => {
    // if (Boolean(token) && !isTokenExpired(jwtDecode(token))) {
    //   config.headers = {
    //     Authorization: `Bearer ${token}`,
    //     "Content-Type": "application/json",
    //   }
    // }else{
    //   config.headers = {
    //     "Content-Type": "application/json",
    //   }
    // }
    config.headers = {
      "Content-Type": "application/json",
    }
    return config;
  };


  React.useEffect(() => {
    instance.interceptors.request.use((config) => configuration(config));
  }, []);

  React.useEffect(() => {
    const responseInterceptor = instance.interceptors.response.use(
        (response) => response,
        (error) => {
          const [errorStatus, errorMessage] = getErrorStatusAndMessage(error);
          handleError(errorStatus, errorMessage);
          return Promise.reject(error);
        }
    );
    setIsAppReady(true);
    return () => {
      instance.interceptors.response.eject(responseInterceptor);
    };
  }, []);

  //return isAppReady ? children : <Backdrop open={true} />;
  return children;
};

export { AxiosInterceptor };

export default instance;
