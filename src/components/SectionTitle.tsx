import { Box, Button, ButtonProps, Stack, Typography, styled } from "@mui/material";
import { useTranslations } from "next-intl";
import { AiOutlinePlus } from "react-icons/ai";

export const ButtonStyled = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.primary.main,
    width: 84,
    fontSize: "15px",
    backgroundColor: "#fff",
    "&:hover": {
        borderColor: theme.palette.primary.light,
    },
    borderRadius: 8,
    boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
    border: "1px solid",
    borderColor: theme.palette.primary.light,
}));

type SectionTitleProps = {
    mainTitle: string;
    subTitle?: string;
    showAdd?: boolean;
    addLink?: string;
};

export default function SectionTitle({ mainTitle, subTitle, showAdd = true, addLink }: SectionTitleProps) {
    const t = useTranslations();

    return (
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={4}>
            <Box>
                <Typography variant="h2" fontSize="30px" color="primary.main">
                    {mainTitle}
                </Typography>
                {subTitle && (
                    <Typography variant="h5" mt="5px" color="Grey.500" fontWeight={400}>
                        {subTitle}
                    </Typography>
                )}
            </Box>
            <Box display="flex" alignItems="center" columnGap={2}>
                {showAdd && (
                    <ButtonStyled
                        href={addLink}
                        variant="contained"
                        sx={{
                            fontWeight: 600,
                            color: "#fff",
                            bgcolor: "primary.main",
                            "&:hover": { bgcolor: "primary.600" },
                        }}
                        startIcon={<AiOutlinePlus />}
                    >
                        {t("add")}
                    </ButtonStyled>
                )}
            </Box>
        </Stack>
    );
}
