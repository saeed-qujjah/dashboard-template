"use client";
import { IconButton } from "@mui/material";
import clsx from "clsx";
import { useLocale } from "next-intl";
import React, { ReactNode } from "react";
import { BsThreeDotsVertical } from "react-icons/Bs";

type TheadProps = {
    title1: string;
    title2?: string;
    title3?: string;
    title4?: string;
    title5?: string;
    title6?: string;
    title7?: string;
    title8?: string;
    widthCol1?: string;
    widthCol2?: string;
    widthCol3?: string;
    lastTitle?: ReactNode | string;
};

export default function Thead({
    title1 = "",
    title2 = "",
    title3 = "",
    title4,
    title5,
    title6,
    title7,
    title8,
    widthCol1,
    widthCol2,
    widthCol3,
    lastTitle = <BsThreeDotsVertical />,
}: TheadProps) {
    const locale = useLocale();

    return (
        <thead className="tw-text-Grey-600 tw-text-[12px] tw-font-medium">
            <tr className="tw-border-b tw-border-Grey-200">
                <th
                    className={clsx(
                        "tw-bg-Grey-50 tw-py-2 tw-ps-6 tw-text-start tw-font-medium",
                        locale == "en" ? "tw-rounded-tl-[8px]" : "tw-rounded-tr-[8px]"
                    )}
                    style={{ width: widthCol1 ? widthCol1 : "30%" }}
                >
                    {title1}
                </th>
                <th className="tw-bg-Grey-50 py-2 tw-font-medium tw-text-start" style={{ width: widthCol2 ? widthCol2 : "20%" }}>
                    {title2}
                </th>
                <th className="tw-bg-Grey-50 py-2 tw-font-medium tw-text-start" style={{ width: widthCol3 ? widthCol3 : "30%" }}>
                    {title3}
                </th>

                {title4 && <th className="tw-bg-Grey-50 py-2 tw-font-medium tw-text-start tw-w-[12%]">{title4}</th>}
                {title5 && <th className="tw-bg-Grey-50 py-2 tw-font-medium tw-text-start tw-w-[9%]">{title5}</th>}
                {title6 && <th className="tw-bg-Grey-50 py-2 tw-font-medium tw-text-start tw-w-[9%]">{title6}</th>}
                {title7 && <th className="tw-bg-Grey-50 py-2 tw-font-medium tw-text-start tw-w-[11%]">{title7}</th>}
                {title8 && <th className="tw-bg-Grey-50 py-2 tw-font-medium tw-text-start tw-w-[11%]">{title8}</th>}

                <th
                    className={clsx(
                        "tw-bg-Grey-50 py-2 tw-font-medium tw-pe-6 tw-text-end",
                        locale == "en" ? "tw-rounded-tr-[8px]" : "tw-rounded-tl-[8px]"
                    )}
                >
                    <IconButton sx={{ color: "Grey.500", fontSize: "20px", "&:hover": { cursor: "default", bgcolor: "inherit" } }}>
                        {lastTitle}
                    </IconButton>
                </th>
            </tr>
        </thead>
    );
}
