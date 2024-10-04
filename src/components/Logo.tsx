import Link from "next-intl/link";
import { styled } from "@mui/material";
import Image from "next/image";

const LinkStyled = styled(Link)(() => ({
    height: "32px",
    width: "142px",
    overflow: "hidden",
    display: "block",
}));

const Logo = () => {
    return (
        <LinkStyled href="/">
            <Image unoptimized src="/images/Logo.svg" alt="logo" height={32} width={142} className="tw-pl-1" priority />
        </LinkStyled>
    );
};

export default Logo;
