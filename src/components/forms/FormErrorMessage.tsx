import { useTheme } from "@mui/material";
import { FieldError, Merge } from "react-hook-form";

/**
 * Inspired by https://github.com/react-hook-form/error-message/tree/master
 * Note that the Merge type is stolen from an error message from react hook form.
 *
 * Before using Merge<>, I used: `FieldError | undefined`, but TS didn't like that.
 */
export const FormErrorMessage = ({ error }: { error: Merge<FieldError, (FieldError | undefined)[]> | undefined }) => {
    const theme = useTheme();
    return error?.message && <p style={{ color: theme.palette.error.main, margin: "4px 0 10px 14px",fontSize:"11px" }}>{error.message}</p>;
};
