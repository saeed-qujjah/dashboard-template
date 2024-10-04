import { ConfirmationModalProps } from "@/components/modals/ConfirmationModal";
import NiceModal from "@ebay/nice-modal-react";
import dynamic from "next/dynamic";
import { FC } from "react";

const ConfirmationModal = dynamic(() => import("@/components/modals/ConfirmationModal").then((mod) => mod.ConfirmationModal));

export const showConfirmationModal = (props: ConfirmationModalProps) => {
    NiceModal.show(ConfirmationModal as FC, props);
};
