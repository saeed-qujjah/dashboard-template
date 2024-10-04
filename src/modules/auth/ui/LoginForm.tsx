"use client";

import { useParams, useRouter } from "next/navigation";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useLogin } from "../api/login";
import { useTranslations } from "next-intl";
import { CustomTextField, StyledInputLabel } from "@/components/forms/CustomTextField";
import { LoadingButton } from "@mui/lab";

interface FormFields {
    email: string;
    password: string;
}

const LoginForm = () => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<FormFields>({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const { mutate: login, isLoading } = useLogin();
    const router = useRouter();
    const params = useParams();
    const t = useTranslations();

    const onSubmit: SubmitHandler<FormFields> = (data) => {
        login(
            {
                email: data.email,
                password: data.password,
            },
            {
                onSuccess() {
                    if (params.returnUrl) router.push(params.returnUrl as string);
                    else router.push(`/`);

                    toast.success(t("successfullyLoggedIn"));
                },
            }
        );
    };

    return (
        <div className="tw-relative tw-flex tw-justify-center tw-items-center tw-h-[100vh]">
            <div className="tw-absolute tw-top-[32px] tw-left-[32px] tw-flex tw-items-center tw-gap-[10px]">
                <p className="tw-text-primary tw-text-[18px] tw-font-[600]">Dashboard</p>
            </div>

            <div className="tw-w-[400px] tw-flex tw-flex-col tw-bg-Grey-50 tw-p-10 tw-rounded-2xl tw-border tw-border-Grey-300">
                <p className="tw-text-[30px] tw-font-[600] tw-text-primary">Log in to your account</p>

                <p className="tw-text-[16px] tw-font-[400] tw-text-Grey-500 tw-mt-[15px] tw-mb-[32px]">
                    Welcome back! Please enter your details.
                </p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="tw-flex tw-flex-col tw-gap-[20px]">
                        <div>
                            <Controller
                                control={control}
                                rules={{ required: t("fieldRequired") }}
                                name="email"
                                render={({ field }) => (
                                    <>
                                        <StyledInputLabel htmlFor="input-with-icon-adornment">Email</StyledInputLabel>
                                        <CustomTextField
                                            {...field}
                                            type="email"
                                            error={!!errors.email}
                                            helperText={errors.email?.message ?? ""}
                                            fullWidth
                                            size="small"
                                        />
                                    </>
                                )}
                            />
                        </div>

                        <div>
                            <Controller
                                control={control}
                                rules={{ required: t("fieldRequired") }}
                                name="password"
                                render={({ field }) => (
                                    <>
                                        <StyledInputLabel htmlFor="input-with-icon-adornment">Password</StyledInputLabel>
                                        <CustomTextField
                                            {...field}
                                            error={!!errors.password}
                                            helperText={errors.password?.message ?? ""}
                                            type="password"
                                            fullWidth
                                            size="small"
                                        />
                                    </>
                                )}
                            />
                        </div>

                        <LoadingButton
                            loading={isLoading}
                            sx={{
                                mt: 3,
                                width: "100%",
                                height: "40px",
                                p: 0,
                                boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
                                fontWeight: "600",
                                fontSize: "16px",
                                borderRadius: "8px",
                                borderColor: "primary.500",
                                "&:hover": { bgcolor: "primary.600", boxShadow: "0   " },
                            }}
                            type="submit"
                            variant="contained"
                        >
                            Sign in
                        </LoadingButton>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
