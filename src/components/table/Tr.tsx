import { showConfirmationModal } from "@/utils/modals";
import { IconButton } from "@mui/material";
import { useTranslations } from "next-intl";
import React, { ReactNode } from "react";
import toast from "react-hot-toast";

type TrProps = {
    col1: string | ReactNode;
    col2?: string | ReactNode;
    col3?: string | ReactNode;
    col4?: string | ReactNode;
    col5?: string | ReactNode;
    col6?: string | ReactNode;
    col7?: string | ReactNode;
    col8?: string | ReactNode;
    canDelete?: boolean;
    editLink?: string;
    id: string;
    deleteItem?: (id: string) => Promise<any>;
};

export default function Tr({
    col1 = "",
    col2 = "",
    col3 = "",
    col4,
    col5,
    col6,
    col7,
    col8,
    canDelete = true,
    editLink,
    id,
    deleteItem,
}: TrProps) {
    const t = useTranslations();

    return (
        <tr className="tw-text-primary tw-text-[14px] tw-relative">
            <td className="tw-p-6">{col1}</td>
            <td>{col2}</td>
            <td>{col3}</td>
            {col4 !== undefined && <td>{col4}</td>}
            {col5 !== undefined && <td>{col5}</td>}
            {col6 !== undefined && <td>{col6}</td>}
            {col7 !== undefined && <td>{col7}</td>}
            {col8 !== undefined && <td>{col8}</td>}
            <td>
                <div className="tw-px-6 tw-flex tw-justify-end tw-items-center tw-gap-[80px]">
                    {canDelete && deleteItem && (
                        <IconButton
                            sx={{ zIndex: "1000" }}
                            onClick={() => {
                                showConfirmationModal({
                                    async onConfirm() {
                                        try {
                                            await deleteItem(id);
                                            toast.success(t("deleteSucces"));
                                        } catch {
                                            return;
                                        }
                                    },
                                });
                            }}
                        >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M13.3333 5.00002V4.33335C13.3333 3.39993 13.3333 2.93322 13.1517 2.5767C12.9919 2.2631 12.7369 2.00813 12.4233 1.84834C12.0668 1.66669 11.6001 1.66669 10.6667 1.66669H9.33333C8.39991 1.66669 7.9332 1.66669 7.57668 1.84834C7.26308 2.00813 7.00811 2.2631 6.84832 2.5767C6.66667 2.93322 6.66667 3.39993 6.66667 4.33335V5.00002M8.33333 9.58335V13.75M11.6667 9.58335V13.75M2.5 5.00002H17.5M15.8333 5.00002V14.3334C15.8333 15.7335 15.8333 16.4336 15.5608 16.9683C15.3212 17.4387 14.9387 17.8212 14.4683 18.0609C13.9335 18.3334 13.2335 18.3334 11.8333 18.3334H8.16667C6.76654 18.3334 6.06647 18.3334 5.53169 18.0609C5.06129 17.8212 4.67883 17.4387 4.43915 16.9683C4.16667 16.4336 4.16667 15.7335 4.16667 14.3334V5.00002"
                                    stroke="#C30303"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </IconButton>
                    )}

                    {editLink && (
                        <IconButton href={editLink + id} sx={{ zIndex: "1000" }}>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M17.5007 17.5H10.834M2.08398 17.9167L6.70838 16.138C7.00416 16.0243 7.15205 15.9674 7.29042 15.8931C7.41332 15.8272 7.53048 15.751 7.64068 15.6655C7.76475 15.5692 7.8768 15.4572 8.10088 15.2331L17.5007 5.83332C18.4211 4.91285 18.4211 3.42046 17.5007 2.49999C16.5802 1.57951 15.0878 1.57951 14.1673 2.49999L4.76755 11.8998C4.54346 12.1238 4.43142 12.2359 4.33514 12.36C4.24963 12.4702 4.17349 12.5873 4.10751 12.7102C4.03324 12.8486 3.97636 12.9965 3.86259 13.2923L2.08398 17.9167ZM2.08398 17.9167L3.79908 13.4575C3.92182 13.1384 3.98318 12.9788 4.08843 12.9057C4.18042 12.8419 4.29424 12.8177 4.40423 12.8387C4.5301 12.8627 4.65097 12.9836 4.89272 13.2254L6.7753 15.1079C7.01704 15.3497 7.13792 15.4706 7.16196 15.5964C7.18296 15.7064 7.15881 15.8202 7.09494 15.9122C7.02186 16.0175 6.86231 16.0788 6.54321 16.2016L2.08398 17.9167Z"
                                    stroke="#667085"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </IconButton>
                    )}
                </div>
            </td>
        </tr>
    );
}
