import { create } from "zustand";
import { User } from "./types";

export const USER_LOCAL_STORAGE_KEY = "user_info";
type UserWithToken = User & {
    token: string;
};

interface AuthState {
    user?: UserWithToken;
    setUser: (user: UserWithToken | undefined) => void;
}

const getInitialUserData = () => {
    if (typeof window === "undefined") return undefined;

    const userInfo = window.localStorage.getItem(USER_LOCAL_STORAGE_KEY);
    if (userInfo) {
        return JSON.parse(userInfo);
    }
    return undefined;
};

export const useAuthStore = create<AuthState>()((set) => ({
    user: getInitialUserData(),
    setUser: (user) => {
        set({ user });
    },
}));
