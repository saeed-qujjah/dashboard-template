import { showConfirmationModal } from "@/utils/modals";
import { ListItemIcon, Menu, MenuItem } from "@mui/material";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";

const PaperProps = {
    elevation: 0,
    sx: {
        overflow: "visible",
        "& .MuiList-root": {
            width: "186px",
            bgcolor: "Grey.50",
        },
    },
};

type MenuActionsProps = {
    anchorEl: null | HTMLElement;
    open: boolean;
    handleClose: (event: React.MouseEvent<HTMLElement>) => void;
    editLink?: string;
    id: string;
    deleteItem: (id: string) => Promise<any>;
};

export default function MenuActionsEditDelete({ anchorEl, open, handleClose, editLink, id, deleteItem }: MenuActionsProps) {
    const t = useTranslations();
    const locale = useLocale();
    const positionMenu = locale == "ar" ? "left" : "right";

    return (
        <Menu
            anchorEl={anchorEl}
            id="actions-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={PaperProps}
            transformOrigin={{ horizontal: positionMenu, vertical: "top" }}
            anchorOrigin={{ horizontal: positionMenu, vertical: "bottom" }}
        >
            {editLink && <Link href={editLink + id} style={{ textDecoration: "none" }}>
                <MenuItem
                    divider
                    sx={{
                        py: "10px",
                        "& .MuiListItemIcon-root": { minWidth: "26px" },
                        color: "primary.main",
                        fontSize: "14px",
                        fontWeight: "600",
                        "&:hover": { bgcolor: "Grey.200" },
                    }}
                >
                    <ListItemIcon>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_3387_2588)">
                                <path
                                    d="M14.0001 14H8.66677M1.66675 14.3334L5.36626 12.9105C5.60289 12.8195 5.7212 12.774 5.83189 12.7146C5.93022 12.6618 6.02395 12.6009 6.11211 12.5324C6.21136 12.4554 6.301 12.3658 6.48027 12.1865L14.0001 4.66671C14.7365 3.93033 14.7365 2.73642 14.0001 2.00004C13.2637 1.26366 12.0698 1.26366 11.3334 2.00004L3.8136 9.51985C3.63433 9.69912 3.5447 9.78876 3.46768 9.88801C3.39926 9.97617 3.33835 10.0699 3.28557 10.1682C3.22615 10.2789 3.18065 10.3972 3.08964 10.6339L1.66675 14.3334ZM1.66675 14.3334L3.03883 10.766C3.13701 10.5107 3.1861 10.3831 3.27031 10.3246C3.34389 10.2735 3.43495 10.2542 3.52295 10.271C3.62364 10.2902 3.72034 10.3869 3.91374 10.5803L5.4198 12.0864C5.6132 12.2798 5.7099 12.3765 5.72912 12.4772C5.74593 12.5652 5.72661 12.6562 5.67551 12.7298C5.61705 12.814 5.48941 12.8631 5.23413 12.9613L1.66675 14.3334Z"
                                    stroke="#235265"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </g>
                            <defs>
                                <clipPath id="clip0_3387_2588">
                                    <rect width="16" height="16" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </ListItemIcon>
                    {t("edit")}
                </MenuItem>
            </Link>}

            <MenuItem
                onClick={() => {
                    showConfirmationModal({
                        async onConfirm() {
                            try {
                                await deleteItem(id);
                                toast.success(t("deleteSuccess"));
                            } catch {
                                return;
                            }
                        },
                    });
                }}
                sx={{
                    py: "10px",
                    "& .MuiListItemIcon-root": { minWidth: "26px" },
                    color: "#C30303",
                    fontSize: "14px",
                    fontWeight: "600",
                    "&:hover": { bgcolor: "Grey.200" },
                }}
            >
                <ListItemIcon>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M6 2H10M2 4H14M12.6667 4L12.1991 11.0129C12.129 12.065 12.0939 12.5911 11.8667 12.99C11.6666 13.3412 11.3648 13.6235 11.0011 13.7998C10.588 14 10.0607 14 9.00623 14H6.99377C5.93927 14 5.41202 14 4.99889 13.7998C4.63517 13.6235 4.33339 13.3412 4.13332 12.99C3.90607 12.5911 3.871 12.065 3.80086 11.0129L3.33333 4M6.66667 7V10.3333M9.33333 7V10.3333"
                            stroke="#C30303"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </ListItemIcon>
                {t("delete")}
            </MenuItem>
        </Menu>
    );
}
