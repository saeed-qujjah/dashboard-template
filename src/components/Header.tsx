"use client";
import { AppBar, Box, Stack, ToggleButton, ToggleButtonGroup, Toolbar, styled } from "@mui/material";
import PropTypes from "prop-types";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next-intl/client";
import React from "react";
import { useSearchParams } from "next/navigation";

const AppBarStyled = styled(AppBar)(({ theme }) => ({
    boxShadow: "none",
    background: theme.palette.background.paper,
    justifyContent: "center",
    backdropFilter: "blur(4px)",
    [theme.breakpoints.up("lg")]: {
        minHeight: "70px",
    },
}));
const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
    width: "100%",
    color: theme.palette.text.secondary,
}));

const Header = () => {
    const locale = useLocale();
    const params = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const [alignment, setAlignment] = React.useState(locale);

    const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
        setAlignment(newAlignment);
        router.replace(params ? `${pathname}?${params}` : pathname, { locale: newAlignment });
    };

    return (
        <AppBarStyled position="sticky" color="default">
            <ToolbarStyled>
                <Box flexGrow={1} />
                <Stack spacing={0} direction="row" alignItems="center">
                    <ToggleButtonGroup
                        color="primary"
                        value={alignment}
                        sx={{ p: "0px 13px" }}
                        size="small"
                        exclusive
                        onChange={handleChange}
                        aria-label="Platform"
                    >
                        <ToggleButton sx={{ p: "5px 7px" }} value="en">
                            En
                        </ToggleButton>
                        <ToggleButton sx={{ p: "5px 7px" }} value="ar">
                            Ar
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Stack>
            </ToolbarStyled>
        </AppBarStyled>
    );
};

Header.propTypes = {
    sx: PropTypes.object,
};

export default Header;
