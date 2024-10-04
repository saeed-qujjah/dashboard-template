import { useAuthStore } from "@/modules/auth/auth-store";
import { Box, CircularProgress } from "@mui/material";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { ReactElement, ReactNode, useEffect, useState } from "react";

interface AuthGuardProps {
    children: ReactNode;
    fallback?: ReactElement | null;
}

const OnlyLoggedInUsersGuard = ({ children }: AuthGuardProps) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const user = useAuthStore((state) => state.user);
    useEffect(() => {
        setIsLoggedIn(!!user);
        setIsLoading(false);
    }, [user]);

    const router = useRouter();
    const pathname = usePathname();
    const locale = useLocale()

    useEffect(
        () => {
            if (!isLoading && !isLoggedIn) {
                const queryParams = pathname !== "/" ? `?returnUrl=${pathname}` : "";
                const href = `/${locale}/login${queryParams}`;
                router.replace(href);
            }
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [pathname, isLoading]
    );

    if (isLoading) return <Box sx={{display:"flex",justifyContent:"center",alignItems:"center",py:"100px"}}><CircularProgress size={70}/></Box>

    if (!isLoading && !isLoggedIn) {
        return null;
    }

    return <div>{children}</div>;
};

export default OnlyLoggedInUsersGuard;
