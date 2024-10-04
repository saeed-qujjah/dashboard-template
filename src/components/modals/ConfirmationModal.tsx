import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { useState } from "react";

export type ConfirmationModalProps = {
    onConfirm: () => Promise<void>;
    onCancel?: () => void;

    title?: string;
    body?: string;
    submit?: string;
};

import { LoadingButton } from "@mui/lab";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useTranslations } from "next-intl";
import { ButtonStyled } from "../SectionTitle";

export const ConfirmationModal = NiceModal.create<ConfirmationModalProps>(({ onConfirm, onCancel, title, body="" ,submit = "delete"}) => {
    const [isLoading, setIsLoading] = useState(false);
    const t = useTranslations();

    const modal = useModal();

    return (
        <Dialog
            sx={{ "& .MuiPaper-root": { width: "80%" , p:"35px",borderRadius:"16px"} }}
            open={modal.visible}
            onClose={modal.hide}
            maxWidth="sm"
        >
            <DialogTitle sx={{ fontWeight: 600, textAlign: "center", fontSize: 24, mb: 1, color:"primary.main"}}>{title ?? t("areYouSureDelete")}</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ fontWeight: 500, textAlign: "center", fontSize: 18, color:"Grey.500"}}>{body}</DialogContentText>
                </DialogContent>
            <DialogActions sx={{ mt: 3,mx:"auto" }}>
                <ButtonStyled
                    disabled={isLoading}
                    sx={{ fontWeight: 600, py: "5px" ,width:"130px","&:hover": { borderColor: "primary.500" }}}
                    onClick={() => {
                        if (onCancel) onCancel();
                        else modal.hide();
                    }}
                >
                    {t("cancel")}
                </ButtonStyled>
                <LoadingButton
                    variant="contained"
                    loading={isLoading}
                    sx={{ fontWeight: 600 ,width:"130px",borderRadius:"8px",border:"1px solid",borderColor:"primary.500","&:hover": { bgcolor: "primary.600" }}}
                    onClick={async () => {
                        setIsLoading(true);
                        await onConfirm();
                        setIsLoading(false);
                        modal.hide();
                    }}
                    autoFocus
                >
                    {submit == "delete" ? t("delete") : submit}
                </LoadingButton>
            </DialogActions>
        </Dialog>
    );
});
