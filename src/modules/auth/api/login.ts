import { httpClient } from "@/lib/http-client";
import { USER_LOCAL_STORAGE_KEY, useAuthStore } from "@/modules/auth/auth-store";
import { useMutation } from "@tanstack/react-query";
import { LoginRequest, LoginResponse } from "../types";

export const useLogin = () => {
    const setUser = useAuthStore((state) => state.setUser);

    return useMutation({
        async mutationFn(params: LoginRequest) {
            const response = await httpClient.post<LoginResponse>("/auth/admin-login", params);

            const userWithToken = {
                ...response.data.user,
                token: response.data.token,
            };
            setUser(userWithToken);
            window.localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(userWithToken));
        },
    });
};
