import { USER_LOCAL_STORAGE_KEY } from "@/modules/auth/auth-store";
import { useMutation } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export const useLogout = () => {
    const router = useRouter();
    const locale = useLocale()

    return useMutation({
        async mutationFn() {
            window.localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
            router.push(`/${locale}/login`);
            toast.success("You have successfully logged out!");
        },
    });
};
