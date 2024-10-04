"use client";
import NiceModal from "@ebay/nice-modal-react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { Toaster } from "react-hot-toast";
import ThemeRegistry from "./ThemeRegistry";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});

export const Providers = ({ children }: PropsWithChildren) => {
    return (
        <>
            <ThemeRegistry>
                <QueryClientProvider client={queryClient}>
                    <NiceModal.Provider>
                        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
                            {children}
                        </LocalizationProvider>
                    </NiceModal.Provider>
                </QueryClientProvider>
            </ThemeRegistry>
            <Toaster />
        </>
    );
};
