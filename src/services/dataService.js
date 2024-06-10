import instance from "../helpers/AxiosInterceptor";

export const loadData = () => {
    return instance.get(`/data`);
};

  