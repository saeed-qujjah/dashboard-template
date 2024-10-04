"use client";
import { Avatar, AvatarGroup, Box, Button, Grid, InputAdornment, Stack, Typography } from "@mui/material";
import { useLocale, useTranslations } from "next-intl";
import { CiSearch } from "react-icons/ci";
import { StyledTextField } from "@/components/forms/CustomTextField";
import { ReactNode } from "react";
import Image from "next/image";
import Link from "next-intl/link";
import { TbBrandAbstract } from "react-icons/tb";
import { AiOutlineShop } from "react-icons/ai";
import { MdOutlineCalendarMonth } from "react-icons/md";
import StoreImage from "/public/images/e-commerce.jpg";

const AnalysisCard = ({ icon, title, count }: { icon: ReactNode; title: string; count?: number }) => {
    return (
        <div className="tw-rounded-2xl tw-border tw-border-Grey-200 tw-bg-[#FCFCFD] tw-p-4">
            <div className="tw-mb-3 tw-w-10 tw-h-10 tw-rounded-full tw-bg-Grey-100 tw-flex tw-justify-center tw-items-center">{icon}</div>

            <p className="tw-text-[14px] tw-text-Grey-500 tw-font-medium tw-mb-2">{title}</p>

            <p className="tw-text-[24px] tw-text-primary tw-font-semibold">{count ?? 0}</p>
        </div>
    );
};

const NewAnalysisCard = ({ title, count, average, href }: { title: string; count?: number; average: string; href?: string }) => {
    const locale = useLocale();
    const t = useTranslations();

    return (
        <div className="tw-px-6 tw-h-[171px] tw-flex tw-items-center tw-rounded-2xl tw-border tw-border-Grey-200 tw-bg-[#FCFCFD]">
            <div className="tw-w-full">
                <div className="tw-flex tw-items-center tw-justify-between tw-mb-3">
                    <p className="tw-text-Grey-500 tw-text-[14px] tw-font-medium">{title}</p>

                    <div className="tw-flex tw-items-center tw-gap-1">
                        <div className="tw-p-1 tw-flex tw-justify-center tw-items-center tw-rounded-full tw-bg-secondary-100">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M8 13.3334V2.66671M8 2.66671L4 6.66671M8 2.66671L12 6.66671"
                                    stroke="#78A5A4"
                                    strokeWidth="1.66667"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>

                        <p className="tw-text-secondary tw-text-[14px] tw-font-medium">{average}</p>
                    </div>
                </div>

                <p className="tw-text-primary tw-font-semibold tw-text-[24px] tw-mb-5">{count ?? 0}</p>

                <div className="tw-flex tw-justify-between tw-items-center">
                    <AvatarGroup
                        total={10}
                        sx={{ "& .MuiAvatar-root": { width: "32px", height: "32px", color: "primary.main", bgcolor: "#E4EDED" } }}
                    >
                        <Avatar alt="Remy Sharp" sx={{ width: "32px", height: "32px" }} />
                        <Avatar alt="Travis Howard" sx={{ width: "32px", height: "32px" }} />
                        <Avatar alt="Agnes Walker" sx={{ width: "32px", height: "32px" }} />
                        <Avatar alt="Trevor Henderson" sx={{ width: "32px", height: "32px" }} />
                    </AvatarGroup>

                    {href && (
                        <Link
                            href={href}
                            className="tw-flex tw-items-center tw-gap-2 tw-text-[14px] tw-text-Grey-500 tw-font-medium tw-cursor-pointer tw-py-2 hover:tw-opacity-70 tw-transition-all"
                        >
                            <p>{t("See All")}</p>

                            <svg
                                className={locale == "ar" ? "tw-rotate-180" : ""}
                                width="20"
                                height="20"
                                viewBox="0 0 20 20"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M3.33301 10H16.6663M16.6663 10L11.6663 5M16.6663 10L11.6663 15"
                                    stroke="#667085"
                                    strokeWidth="1.66667"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
};

const DashboardHomePage = () => {
    const t = useTranslations();
    const locale = useLocale();

    return (
        <Box>
            <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
                <Typography variant="h2" fontSize="30px" color="primary.main">
                    {t("Statistics")}
                </Typography>

                <StyledTextField
                    sx={{
                        width: 320,
                    }}
                    size="small"
                    id="input-with-icon-textfield"
                    placeholder={t("search")}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start" sx={{ color: "Grey.500", fontSize: 20 }}>
                                <CiSearch />
                            </InputAdornment>
                        ),
                    }}
                    variant="outlined"
                />
            </Stack>

            <Grid container spacing={2}>
                <Grid item xs={12} lg={3}>
                    <AnalysisCard
                        icon={
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M18.3337 17.5V15.8333C18.3337 14.2801 17.2713 12.9751 15.8337 12.605M12.917 2.7423C14.1386 3.23679 15.0003 4.43443 15.0003 5.83333C15.0003 7.23224 14.1386 8.42988 12.917 8.92437M14.167 17.5C14.167 15.9469 14.167 15.1703 13.9133 14.5577C13.5749 13.741 12.926 13.092 12.1093 12.7537C11.4967 12.5 10.7201 12.5 9.16699 12.5H6.66699C5.11385 12.5 4.33728 12.5 3.72471 12.7537C2.90795 13.092 2.25904 13.741 1.92073 14.5577C1.66699 15.1703 1.66699 15.9469 1.66699 17.5M11.2503 5.83333C11.2503 7.67428 9.75794 9.16667 7.91699 9.16667C6.07604 9.16667 4.58366 7.67428 4.58366 5.83333C4.58366 3.99238 6.07604 2.5 7.91699 2.5C9.75794 2.5 11.2503 3.99238 11.2503 5.83333Z"
                                    stroke="#235265"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        }
                        title={t("Total Users")}
                        count={200}
                    />
                </Grid>

                <Grid item xs={12} lg={3}>
                    <AnalysisCard
                        icon={<AiOutlineShop className="tw-w-6 tw-h-6 tw-text-[#235265]" />}
                        title={t("Total Products")}
                        count={200}
                    />
                </Grid>

                <Grid item xs={12} lg={3}>
                    <AnalysisCard
                        icon={<MdOutlineCalendarMonth className="tw-w-6 tw-h-6 tw-text-[#235265]" />}
                        title={t("Total Orders")}
                        count={200}
                    />
                </Grid>

                <Grid item xs={12} lg={3}>
                    <AnalysisCard
                        icon={<TbBrandAbstract className="tw-w-6 tw-h-6 tw-text-[#235265]" />}
                        title={t("Total Brands")}
                        count={200}
                    />
                </Grid>

                <Grid item xs={12} lg={8}>
                    <div className="tw-relative tw-w-full tw-h-[358px] tw-rounded-2xl tw-border tw-border-Grey-200">
                        <Image src={StoreImage} alt="" fill className="tw-rounded-2xl tw-object-cover" />

                        <div className="tw-absolute tw-top-0 tw-start-0 tw-w-full tw-h-full tw-rounded-2xl tw-bg-[#202020] tw-bg-opacity-40 tw-px-8 tw-flex tw-items-center">
                            <div className="">
                                <p className="tw-text-[#fff] tw-text-[30px] tw-font-medium tw-mb-6">{t("Products")}</p>

                                <p className="tw-text-Grey-200 tw-leading-6 tw-font-medium tw-max-w-[452px] tw-mb-10 tw-text-[16px]">
                                    Lorem ipsum dolor sit amet consectetur. Viverra diam arcu sagittis hac et. Lorem porta lectus sodales.
                                </p>

                                <Button
                                    variant="contained"
                                    href={`/${locale}`}
                                    sx={{
                                        fontWeight: 600,
                                        py: "5px",
                                        px: "23px",
                                        bgcolor: "#fff",
                                        color: "primary.main",
                                        borderRadius: "8px",
                                        border: "1px solid",
                                        borderColor: "Grey.300",
                                        boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
                                        "&:hover": {
                                            bgcolor: "#fff",
                                        },
                                    }}
                                    endIcon={
                                        <svg
                                            className={locale == "ar" ? "tw-rotate-180" : ""}
                                            width="21"
                                            height="20"
                                            viewBox="0 0 21 20"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M3.83301 10H17.1663M17.1663 10L12.1663 5M17.1663 10L12.1663 15"
                                                stroke="#235265"
                                                strokeWidth="1.66667"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    }
                                >
                                    {t("See all")}
                                </Button>
                            </div>
                        </div>
                    </div>
                </Grid>

                <Grid item xs={12} lg={4}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <NewAnalysisCard
                                title={t("Total New Users")}
                                average="4.32%"
                                count={20}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <NewAnalysisCard
                                title={t("Total New Orders")}
                                average="3.52%"
                                href="/"
                                count={10}
                            />
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default DashboardHomePage;
