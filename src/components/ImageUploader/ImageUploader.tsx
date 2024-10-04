import { downloadFileFromURL, uploadImage } from "@/utils/media";
import NiceModal from "@ebay/nice-modal-react";
import { Box, Button, CircularProgress, Typography } from "@mui/material";
import { Fragment, memo, useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { v4 as uuid4 } from "uuid";
import { ImageCropModal } from "../modals/ImageCropModal";
import { ImagePreview } from "./ImagePreview";
import { useTranslations } from "next-intl";

export interface FileWrapper {
    file: File;
    isUploading?: boolean;
    url: string;
    preview: string;
    id: string;
}

type ImageUploaderProps = {
    onChange: (fileURLs: string[]) => void;
    defaultImageURLs?: string[];
    // If image is chosen, then backend will compress it.
    fileType?: "image" | "svg";
    multiple?: boolean;
};

// User supplies default images in a non stable array reference.
// I don't want to re-render every time the reference changes
function arePropsEqual(oldProps: Readonly<ImageUploaderProps>, newProps: Readonly<ImageUploaderProps>) {
    const oldDefaultFiles = oldProps.defaultImageURLs ?? [];
    const newDefaultFiles = newProps.defaultImageURLs ?? [];

    return (
        oldDefaultFiles.length === newDefaultFiles.length &&
        oldDefaultFiles.every((oldFile, index) => {
            const newFile = newDefaultFiles[index];
            return oldFile == newFile;
        })
    );
}

export const ImageUploader = memo(({ defaultImageURLs: defaultImages, onChange, fileType = "image", multiple }: ImageUploaderProps) => {
    const [files, setFiles] = useState<FileWrapper[]>([]);
    const [isLoadingDefaultImages, setIsLoadingDefaultImages] = useState(false);
    const t = useTranslations();
    
    const { getRootProps, getInputProps } = useDropzone({
        onDrop: async (acceptedFiles: File[]) => {
            const croppedImages: FileWrapper[] = [];

            for (let i = 0; i < acceptedFiles.length; i++) {
                const croppedImage = (await NiceModal.show(ImageCropModal, { image: acceptedFiles[i] })) as File;

                const imageId = uuid4();
                croppedImages.push({
                    file: croppedImage,
                    isUploading: true,
                    url: "",
                    preview: URL.createObjectURL(croppedImage),
                    id: imageId,
                });

                uploadImage({ file: croppedImage, fileType }).then((imageURL) => {
                    setFiles((prevFiles) =>
                        prevFiles.map((item) => {
                            if (item.id == imageId) {
                                return {
                                    ...item,
                                    isUploading: false,
                                    url: imageURL,
                                };
                            }

                            return item;
                        })
                    );

                    if (multiple)
                        onChange(
                            files
                                .map((item) => item.url)
                                .filter((url) => url != "")
                                .concat(imageURL)
                        );
                    else onChange([imageURL]);
                });
            }

            if (multiple) setFiles(files.concat(croppedImages));
            else setFiles(croppedImages);
        },
        multiple,
        accept: {
            "image/*": [".jpeg", ".png", ".webp"],
        },
    });
    
    useEffect(() => {
        const loadDefaultImages = async () => {
            setIsLoadingDefaultImages(true);
            const files = await Promise.all(
                (defaultImages ?? []).map(async (imageURL) => {
                    const file = await downloadFileFromURL(imageURL);
                    return {
                        file,
                        isUploading: false,
                        preview: imageURL,
                        url: imageURL,
                    } as FileWrapper;
                })
            );
            setFiles(files);
            setIsLoadingDefaultImages(false);
        };

        // Filter out empty strings
        if (defaultImages?.filter(Boolean).length) loadDefaultImages();
    }, [defaultImages]);

    const onRemoveFile = (index: number) => {
        setFiles((prevFiles) => prevFiles.filter((item, itemIndex) => index != itemIndex));
        onChange(
            files
                .filter((item, itemIndex) => itemIndex != index)
                .map((item) => item.url)
                .filter((url) => url != "")
        );
    };

    const onRemoveAllFiles = useCallback(() => {
        setFiles([]);
        onChange([]);
    }, [onChange]);

    if (isLoadingDefaultImages) return <CircularProgress />;

    return (
        <Fragment>
            {((fileType == "image" && multiple) || files.length == 0) && (
                <div {...getRootProps({ className: "dropzone" })}>
                    <input {...getInputProps()} />
                    <Box
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        justifyContent="center"
                        sx={{
                            cursor: "pointer",
                            transition: "all 0.2s",
                            p: 2,
                            border: "1px solid",
                            borderColor: "Grey.200",
                            borderRadius: "12px",
                            ":hover": { boxShadow: "0px 2px 2px 0px rgba(16, 24, 40, 0.05)" },
                        }}
                    >
                        <Box
                            width={40}
                            height={40}
                            mb="12px"
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            borderRadius={1}
                            border="1px solid"
                            borderColor="Grey.200"
                        >
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M6.66602 13.3333L9.99935 10M9.99935 10L13.3327 13.3333M9.99935 10V17.5M16.666 13.9524C17.6839 13.1117 18.3327 11.8399 18.3327 10.4167C18.3327 7.88536 16.2807 5.83333 13.7493 5.83333C13.5673 5.83333 13.3969 5.73833 13.3044 5.58145C12.2177 3.73736 10.2114 2.5 7.91602 2.5C4.46424 2.5 1.66602 5.29822 1.66602 8.75C1.66602 10.4718 2.36222 12.0309 3.48847 13.1613"
                                    stroke="#475467"
                                    strokeWidth="1.66667"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </Box>
                        <Box color="primary.main" fontSize="14px" fontWeight={600} display="flex" alignItems="center">
                            {files.length == 1 && !multiple ? t("clickChangeImage") : t("clickUpload")}
                            {files.length == 0 && !multiple && (
                                <Typography variant="h6" fontWeight={400} pl="5px" color="Grey.600">
                                    {t("dragAndDrop")}
                                </Typography>
                            )}
                        </Box>
                        <Typography fontSize="12px" fontWeight={400} color="Grey.600">
                            {fileType == "image" ? "PNG, JPG (max. 800x400px)" : "SVG (max. 1000KB)"}
                        </Typography>
                    </Box>
                </div>
            )}
            {files.length > 0 && (
                <>
                    <Box mt={fileType == "image" ? 2 : 0} display="flex" flexWrap={"wrap"} gap={2}>
                        {files.map((item, index) => (
                            <ImagePreview key={item.file.name} layout={fileType} file={item} onRemove={() => onRemoveFile(index)} />
                        ))}
                    </Box>
                    {files.length > 1 && (
                        <Button sx={{ color: "primary.main", mt: "20px" }} variant="outlined" onClick={onRemoveAllFiles}>
                            {t("removeAllImages")}
                        </Button>
                    )}
                </>
            )}
            {fileType == "svg" && files.length > 0 && (
                <div {...getRootProps({ className: "dropzone" })}>
                    <input {...getInputProps()} />
                    <Button
                        variant="outlined"
                        sx={{
                            borderRadius: "8px",
                            borderColor: "Grey.300",
                            boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
                            color: "primary.main",
                            fontWeight: 600,
                            px: 2,
                            "&:hover": { borderColor: "Grey.400" },
                        }}
                    >
                        {t("changeIcon")}
                    </Button>
                </div>
            )}

            {fileType == "image" && files.length == 1 && !multiple && (
                <div {...getRootProps({ className: "dropzone" })}>
                    <input {...getInputProps()} />
                    <Button
                        variant="outlined"
                        sx={{
                            borderRadius: "8px",
                            borderColor: "Grey.300",
                            boxShadow: "0px 1px 2px 0px rgba(16, 24, 40, 0.05)",
                            color: "primary.main",
                            fontWeight: 600,
                            px: 2,
                            m: "15px 0 0 65px",
                            "&:hover": { borderColor: "Grey.400" },
                        }}
                    >
                        {t("replaceImage")}
                    </Button>
                </div>
            )}
        </Fragment>
    );
}, arePropsEqual);

ImageUploader.displayName = "ImageUploader";
