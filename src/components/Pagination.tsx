import { Box, Button, ButtonProps, Stack, Typography, styled } from "@mui/material";
import { useTranslations } from "next-intl";

const StyledButton = styled(Button)<ButtonProps>(({ theme }) =>
    theme.unstable_sx({
        borderRadius: "8px",
        borderColor: "Grey.300",
        px: "12px",
        "&:hover": { borderColor: "Grey.400" },
        boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
        color: "Grey.700",
    })
);

type PaginationProps = {
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    totalPagesCount: number;
};

export default function Pagination({ page, setPage, totalPagesCount }: PaginationProps) {
    const t = useTranslations();

    return (
        <Box px="24px" pt="12px" mt={2} borderTop="1px solid" borderColor="Grey.200">
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack direction="row" spacing="12px">
                    <StyledButton
                        disabled={page > 1 ? false : true}
                        variant="outlined"
                        onClick={() => {
                            setPage(page - 1);
                        }}
                    >
                        {t("previous")}
                    </StyledButton>
                    <StyledButton
                        disabled={page >= totalPagesCount ? true : false}
                        variant="outlined"
                        onClick={() => {
                            setPage(page + 1);
                        }}
                    >
                        {t("next")}
                    </StyledButton>
                </Stack>
                <Typography gutterBottom variant="h6" m={0} color="primary.main" fontWeight={500}>
                    {t("page") + " " + page + " " + t("of") + " " + totalPagesCount}
                </Typography>
            </Stack>
        </Box>
    );
}
