import { Box, Collapse, List, ListItemButton, Typography, styled } from "@mui/material";
import { useState } from "react";

import { usePathname } from "next/navigation";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { NavigationGroupProps } from "./MenuItems";
import { SingleNavigationItem } from "./SingleNavigationItem";
import { useLocale, useTranslations } from "next-intl";

export const NavigationGroup = ({ item, level }: { item: NavigationGroupProps; level: number }) => {
    const { children, title, href, icon, divider } = item;

    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    const locale = useLocale();

    const t = useTranslations();

    const handleClick = () => {
        setOpen((prev) => !prev);
    };

    const isLinkActive = () => {
        if (!href) return false;
        return pathname.startsWith(`/${locale}${href}`);
    };

    const ListItemButtonStyled = styled(ListItemButton)(({ theme }) =>
        theme.unstable_sx({
            transition: "opacity .25s ease-in-out",
            px: "12px",
            py: "8px",
            mb: open ? 0 : "16px",
            borderRadius: "6px",
            "&:hover": {
                backgroundColor: "Grey.100",
            },
        })
    );

    return (
        <>
            <ListItemButtonStyled
                divider={divider}
                selected={isLinkActive()}
                onClick={handleClick}
            >
                <Box width="100%" alignItems="center" display="flex" justifyContent="space-between">
                    <Box display="flex" alignItems="center" gap="12px">
                        {icon && icon}
                        <Typography variant="h5" sx={{ color: "primary.main" }}>
                            {t(title)}
                        </Typography>
                    </Box>

                    <Box display="flex" fontSize={23} color="primary.400" alignItems="center" justifyContent="center">
                        {open ? (
                            <Box color="#000000">
                                <IoIosArrowUp />
                            </Box>
                        ) : (
                            <IoIosArrowDown />
                        )}
                    </Box>
                </Box>
            </ListItemButtonStyled>

            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" sx={{my:1}}>
                    {children?.map((link: any, index) => {
                        if ("children" in link) return <NavigationGroup level={level + 1} key={index} item={link} />;
                        return <SingleNavigationItem level={level + 1} key={index} item={link} />;
                    })}
                </List>
            </Collapse>
        </>
    );
};
