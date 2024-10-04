import { useAuthStore } from "@/modules/auth/auth-store";
import axios, { AxiosError, AxiosRequestConfig } from "axios";
import toast from "react-hot-toast";

export const httpClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
    headers: {
        Accept: "application/json",
    },
});

const appendAuthorizationHeaders = (config: AxiosRequestConfig<any>) => {
    const accessToken = useAuthStore.getState().user?.token;

    if (!config.headers) config.headers = {};
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
};

httpClient.interceptors.request.use(
    (config) => {
        appendAuthorizationHeaders(config);

        return config;
    },

    (error) => {
        return Promise.reject(error);
    }
);

httpClient.interceptors.response.use(
    (response) => {
        return response;
    },

    (error: AxiosError<any>) => {
        const errorMessage = error.response?.data?.message;
        if (errorMessage) {
            toast.error(errorMessage);
        }

        return Promise.reject(error);
    }
);

export type CommonRequestParams = {
    limit?: number;
    page?: number;
    search?: string;
    /*
        default value "createdAt".
        example: sort=price, -area.
        "-area" descending.
        "area" ascending.
    */
    sort?: string;
};

export type PaginatedResponse<T> = {
    data: T[];
    total_count: number;
};

export type BaseResponse<T> = {
    data: T;
};
