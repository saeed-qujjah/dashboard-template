import { Box, List, ListItem, ListItemButton, ListItemIcon, Typography } from "@mui/material";
import Link from "next-intl/link";
import { usePathname } from "next/navigation";
import { SingleNavigationItemProps } from "./MenuItems";
import { useLocale, useTranslations } from "next-intl";

export const SingleNavigationItem = ({
    item,
    onClick,
    level,
}: {
    item: SingleNavigationItemProps;
    onClick?: () => void;
    level: number;
}) => {
    const { title, id, divider = false, disabled = false, externalLink = false, icon, href } = item;
    const pathname = usePathname();
    const locale = useLocale();

    const t = useTranslations();

    const isLinkActive = () => {
        if (!pathname) return false;
        if (pathname.startsWith(`/${locale}${href}`)) return true;
        return false;
    };

    return (
        <List component="div" disablePadding key={id}>
            <ListItem
                sx={{
                    color: "primary.main",
                    p: 0,
                }}
            >
                <ListItemButton
                    divider={divider}
                    component={Link}
                    href={href ?? ""}
                    disabled={disabled}
                    selected={isLinkActive()}
                    target={externalLink ? "_blank" : ""}
                    onClick={onClick}
                    sx={{
                        p: level >= 1 ? "8px 50px !important" : "8px 12px !important",
                        mb: level >= 1 ? "8px" : "16px",
                        fontWeight: level == 0 ? 600 : 500,
                        whiteSpace: "nowrap",
                        color: level == 0 ? "primary.main" : "Grey.700",
                        borderRadius: "6px",
                        "&:hover": {
                            backgroundColor: "Grey.100",
                        },
                    }}
                >
                    <Box width="100%" alignItems="center" display="flex" gap="12px">
                        <ListItemIcon sx={{ minWidth: "24px", fontSize: "25px", color: "#667085" }}>{icon}</ListItemIcon>
                        <Typography variant="h5" sx={{ fontWeight: "inherit", fontSize: "16px", color: "inherit" }}>
                            {t(title)}
                        </Typography>
                    </Box>
                </ListItemButton>
            </ListItem>
        </List>
    );
};
