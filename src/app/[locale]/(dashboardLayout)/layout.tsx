"use client";
import OnlyLoggedInUsersGuard from "@/components/guards/OnlyLoggedInUsersGuard";
import { httpClient } from "@/lib/http-client";
import { Box, styled } from "@mui/material";
import { useRouter } from "next/navigation";
import { PropsWithChildren, useEffect } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/sidebar/Sidebar";
import { useLocale } from "next-intl";

const MainWrapper = styled("div")(() => ({
    display: "flex",
    minHeight: "100vh",
    width: "100%",
}));

const PageWrapper = styled("div")(() => ({
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
    zIndex: 1,
    backgroundColor: "transparent",
}));

export default function RootLayout({ children }: PropsWithChildren) {
    const router = useRouter();
    const locale = useLocale();

    useEffect(() => {
        // Redirect users to login on 401 (unauthorized) requests
        const interceptor = httpClient.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response.data.error.statusCode == 401) {
                    router.replace(`/${locale}/login`);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            httpClient.interceptors.response.eject(interceptor);
        };
    }, [router, locale]);

    return (
        <OnlyLoggedInUsersGuard>
            <MainWrapper>
                <Sidebar />
                <PageWrapper>
                    <Header />
                    <Box
                        sx={{
                            padding: "32px",
                        }}
                    >
                        <Box sx={{ minHeight: "calc(100vh - 170px)" }}>{children}</Box>
                    </Box>
                </PageWrapper>
            </MainWrapper>
        </OnlyLoggedInUsersGuard>
    );
}
