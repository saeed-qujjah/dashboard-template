import { createTheme } from "@mui/material/styles";
import localFont from "next/font/local";

const tajawal = localFont({
    src: [
        {
            path: "../../public/font/Tajawal-Regular.ttf",
            weight: "400",
            style: "normal",
        },
        {
            path: "../../public/font/Tajawal-Medium.ttf",
            weight: "500",
        },
        {
            path: "../../public/font/Tajawal-Bold.ttf",
            weight: "700",
            style: "normal",
        },
    ],
});

export const baseLightTheme = createTheme({
    direction: "rtl",
    palette: {
        primary: {
            main: "#235265",
            light: "#91A9B2",
            dark: "#071014",
            100: "#D3DCE0",
            200: "#B6C5CC",
            300: "#91A9B2",
            400: "#6C8C98",
            500: "#486F7F",
            600: "#1D4454",
            700: "#173743",
            800: "#122933",
            900: "#0C1B22",
        },
        secondary: {
            main: "#78A5A4",
            light: "#E4EDED",
            dark: "#182121",
            100: "#E4EDED",
            200: "#D2E1E1",
            300: "#BCD2D2",
            400: "#A5C3C2",
            500: "#8FB4B3",
            600: "#648A89",
            700: "#506E6D",
            800: "#3C5352",
            900: "#283737",
        },
        Highlight: {
            main: "#F0816B",
            light: "#FCE6E1",
            dark: "#301A15",
            50: "#FFF9F7",
            100: "#FCE6E1",
            200: "#FAD5CE",
            300: "#F8C0B5",
            400: "#F5AB9C",
            500: "#F39684",
            600: "#C86C59",
            700: "#A05647",
            800: "#784136",
            900: "#502b24",
        },
        success: {
            main: "#13DEB9",
            light: "#E6FFFA",
            dark: "#02b3a9",
            contrastText: "#ffffff",
        },
        info: {
            main: "#539BFF",
            light: "#EBF3FE",
            dark: "#1682d4",
            contrastText: "#ffffff",
        },
        error: {
            main: "#FA896B",
            light: "#FDEDE8",
            dark: "#f3704d",
            contrastText: "#ffffff",
        },
        warning: {
            main: "#FFAE1F",
            light: "#FEF5E5",
            dark: "#ae8e59",
            contrastText: "#ffffff",
        },
        Grey: {
            dark: "#0C111D",
            50: "#F9FAFB",
            100: "#F2F4F7",
            200: "#EAECF0",
            300: "#D0D5DD",
            400: "#98A2B3",
            500: "#667085",
            600: "#475467",
            700: "#344054",
            800: "#1D2939",
            900: "#101828",
        },
        text: {
            primary: "#2A3547",
            secondary: "#5A6A85",
        },
        action: {
            disabledBackground: "rgba(73,82,88,0.12)",
            hoverOpacity: 0.02,
            hover: "#f6f9fc",
        },
        divider: "#e5eaef",
    },
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 768,
            lg: 1024,
            xl: 1280,
        },
    },
    typography: {
        fontFamily: tajawal.style.fontFamily,
        h1: {
            fontWeight: 600,
            fontSize: "2.25rem",
            lineHeight: "2.75rem",
            fontFamily: tajawal.style.fontFamily,
        },
        h2: {
            fontWeight: 600,
            fontSize: "30px",
            lineHeight: "38px",
            fontFamily: tajawal.style.fontFamily,
        },
        h3: {
            fontWeight: 600,
            fontSize: "24px",
            lineHeight: "32px",
            fontFamily: tajawal.style.fontFamily,
        },
        h4: {
            fontWeight: 600,
            fontSize: "1.3125rem",
            lineHeight: "1.6rem",
        },
        h5: {
            fontWeight: 600,
            fontSize: "16px",
            lineHeight: "24px",
        },
        h6: {
            fontWeight: 600,
            fontSize: "14px",
            lineHeight: "20px",
        },
        button: {
            textTransform: "capitalize",
            fontWeight: 600,
            fontSize: "14px",
        },
        body1: {
            fontSize: "0.875rem",
            fontWeight: 400,
            lineHeight: "1.334rem",
        },
        body2: {
            fontSize: "0.75rem",
            letterSpacing: "0rem",
            fontWeight: 400,
            lineHeight: "1rem",
        },
        subtitle1: {
            fontSize: "0.875rem",
            fontWeight: 400,
        },
        subtitle2: {
            fontSize: "0.875rem",
            fontWeight: 400,
        },
    },
    components: {
        MuiList: {
            defaultProps: {
                disablePadding: true,
            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    backgroundColor: "#F9FAFB",
                    color: "#235265",
                    fontSize: "14px",
                    padding: "7px 16px",
                    fontWeight: 500,
                    "&:hover": { backgroundColor: "#F2F4F7" },
                    "& .Mui-selected": { backgroundColor: "#F2F4F7" },
                },
            },
        },
        MuiCssBaseline: {
            styleOverrides: {
                ".MuiPaper-elevation9, .MuiPopover-root .MuiPaper-elevation": {
                    boxShadow: "rgb(145 158 171 / 30%) 0px 0px 2px 0px, rgb(145 158 171 / 12%) 0px 12px 24px -4px !important",
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: "7px",
                },
            },
        },
    },
});
