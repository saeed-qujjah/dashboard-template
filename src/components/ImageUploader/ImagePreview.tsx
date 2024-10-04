import { Box, CircularProgress, IconButton, Typography } from "@mui/material";
import { MdFileCopy } from "react-icons/md";
import { FileWrapper } from "./ImageUploader";
import { showConfirmationModal } from "@/utils/modals";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";
import Image from "next/image";

export const ImagePreview = ({ file, onRemove, layout }: { file: FileWrapper; onRemove: () => void; layout: "image" | "svg" }) => {
    const { name, type, size } = file.file;
    const t = useTranslations();

    return (
        <Box key={name}>
            <div style={{ display: "flex", marginBottom: 3 }}>
                {type.startsWith("image") ? ( // eslint-disable-next-line @next/next/no-img-element
                    <Box
                        sx={{ position: "relative", display: "flex", justifyContent: "center" }}
                        width={layout == "image" ? 254 : 105}
                    >
                        <Image
                            width={layout == "image" ? 254 : 60}
                            height={layout == "image" ? 196 : 60}
                            alt={name}
                            src={file.preview}
                            style={{ objectFit: "contain", borderRadius: "15px", filter: file.isUploading ? "grayscale(100)" : "" }}
                            onLoad={() => URL.revokeObjectURL(file.preview)}
                        />
                        {file.isUploading && (
                            <Box
                                sx={{
                                    position: "absolute",
                                    backgroundColor: "rgba(0,0,0,0.7)",
                                    inset: 0,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: 2,
                                }}
                            >
                                <CircularProgress color="primary" />
                            </Box>
                        )}
                    </Box>
                ) : (
                    <MdFileCopy />
                )}
            </div>
            <Box display="flex" justifyContent="space-between" alignItems="start">
                {layout == "image" && (
                    <div>
                        <Typography fontWeight={500} variant="h6" width={200} color="primary.main" sx={{wordBreak:"break-all"}}>
                            
                        {/* When I retrieve the image from the server, it returns the full link,
                         and I do not want to display the url, I want just a name */}
                            {name.split("/")[name.split("/").length - 1]}
                        </Typography>
                        <Typography className="file-size" variant="h6" color="Grey.500" fontWeight={500}>
                            {Math.round(size / 100) / 10 > 1000
                                ? `${(Math.round(size / 100) / 10000).toFixed(1)} MB`
                                : `${(Math.round(size / 100) / 10).toFixed(1)} KB`}
                        </Typography>
                    </div>
                )}
                <IconButton
                    title="إزالة الصورة"
                    sx={{ px: layout == "svg" ? "45px" : "" }}
                    onClick={() => {
                        showConfirmationModal({
                            async onConfirm() {
                                onRemove();
                                toast.success(t("deleteSucces"));
                            },
                        });
                    }}
                >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M13.3333 5.00033V4.33366C13.3333 3.40024 13.3333 2.93353 13.1517 2.57701C12.9919 2.2634 12.7369 2.00844 12.4233 1.84865C12.0668 1.66699 11.6001 1.66699 10.6667 1.66699H9.33333C8.39991 1.66699 7.9332 1.66699 7.57668 1.84865C7.26308 2.00844 7.00811 2.2634 6.84832 2.57701C6.66667 2.93353 6.66667 3.40024 6.66667 4.33366V5.00033M8.33333 9.58366V13.7503M11.6667 9.58366V13.7503M2.5 5.00033H17.5M15.8333 5.00033V14.3337C15.8333 15.7338 15.8333 16.4339 15.5608 16.9686C15.3212 17.439 14.9387 17.8215 14.4683 18.0612C13.9335 18.3337 13.2335 18.3337 11.8333 18.3337H8.16667C6.76654 18.3337 6.06647 18.3337 5.53169 18.0612C5.06129 17.8215 4.67883 17.439 4.43915 16.9686C4.16667 16.4339 4.16667 15.7338 4.16667 14.3337V5.00033"
                            stroke="#C30303"
                            strokeWidth="1.66667"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </IconButton>
            </Box>
        </Box>
    );
};
