import { CircularProgress, InputLabel, TextField, TextFieldProps, TextareaAutosize, TextareaAutosizeProps, styled } from "@mui/material";

export const StyledTextField = styled(TextField)(({ theme }) =>
    theme.unstable_sx({
        "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
            color: "primary.main",
            bgcolor: "#fff",
            fontSize: "16px",
            fontWeight: 500,
            boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
            "& ::placeholder": { color: "Grey.900" },
            "& fieldset": {
                borderColor: "Grey.300",
            },
            "&:hover fieldset": {
                borderColor: "Grey.400",
            },
            "&.Mui-focused fieldset": {
                borderColor: "Grey.400",
                borderWidth: "1px",
            },
        },
    })
);

export const StyledTextErea = styled(TextareaAutosize)(({ theme }) =>
    theme.unstable_sx({
            borderRadius: "8px",
            color: "primary.main",
            bgcolor: "#fff",
            fontSize: "16px",
            fontWeight: 500,
            width:"100%",
            border:"1px solid",
            p:"9px 12px",
            borderColor: "Grey.300",
            boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
            "& ::placeholder": { color: "Grey.900" },
            "&:hover": {
                borderColor: "Grey.400",
            },
            "&:focus": {
                borderColor: "Grey.400",
                outline:"none",
            },
    })
);

export const StyledInputLabel = styled(InputLabel)(({ theme }) =>
    theme.unstable_sx({
        fontSize: "14px",
        fontWeight: 500,
        color: "Grey.700",
        mb: "5px",
        borderColor: "Grey.100",
    })
);

export type CustomTextFieldProps = TextFieldProps & {
    isLoading?: boolean;
};

export type CustomTextEreaProps = TextareaAutosizeProps & {
    isLoading?: boolean;
};

export const CustomTextField = ({ isLoading = false, ...props }: CustomTextFieldProps) => {
    return (
        <StyledTextField
            InputProps={{ startAdornment: isLoading ? <CircularProgress size={20} /> : undefined }}
            disabled={isLoading}
            {...props}
        />
    );
};

export const CustomTextErea = ({ isLoading = false, ...props }: CustomTextEreaProps) => {
    return <StyledTextErea disabled={isLoading} {...props} />;
};
