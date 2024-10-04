import NiceModal, { useModal } from "@ebay/nice-modal-react";
import { Box, Button, Dialog, Slider, Typography } from "@mui/material";
import { useMemo, useState } from "react";
import Cropper, { Area } from "react-easy-crop";
import { MdAspectRatio } from "react-icons/md";
import { getCroppedImage } from "./canvas-utils";
import { RiCloseLine } from "react-icons/ri";

export type ImageCropModalProps = {
    image: File;
};

const aspectRatioOptions = [
    {
        value: 16 / 9,
        text: "9 / 16",
    },
    {
        value: 4 / 3,
        text: "3 / 4",
    },
    {
        value: 1 / 1,
        text: "1 / 1",
    },
];

export const ImageCropModal = NiceModal.create<ImageCropModalProps>(({ image }) => {
    const modal = useModal();

    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [aspectRatio, setAspectRatio] = useState(4 / 3);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

    const imageBase64Data = useMemo(() => URL.createObjectURL(image), [image]);

    const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };

    const onDone = async () => {
        const croppedImage = await getCroppedImage(image, imageBase64Data, croppedAreaPixels, 0);
        modal.resolve(croppedImage);
        modal.hide();
    };

    return (
        <Dialog
            TransitionComponent={undefined}
            sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 580, p: 4 }, position: "relative" }}
            open={modal.visible}
            maxWidth="lg"
        >
            <Box style={{ position: "relative", width: "100%", height: 300, background: "#333" }} sx={{ mb: 2 }}>
                <Cropper
                    image={imageBase64Data}
                    crop={crop}
                    zoom={zoom}
                    aspect={aspectRatio}
                    onCropChange={setCrop}
                    onCropComplete={onCropComplete}
                    onZoomChange={setZoom}
                />
            </Box>

            <RiCloseLine className="tw-cursor-pointer tw-absolute tw-top-8 tw-end-2 tw-text-3xl" onClick={() => modal.hide()} />

            <Box mb={3}>
                <Typography fontWeight="bold">Zoom</Typography>
                <Slider
                    sx={{ width: 200 }}
                    value={zoom}
                    min={1}
                    max={3}
                    step={0.1}
                    aria-labelledby="Zoom"
                    onChange={(e, zoom) => setZoom(Number(zoom))}
                />

                <Typography mb={2} fontWeight="bold">
                    Aspect Ratio
                </Typography>
                <Box display="flex" gap={3} alignItems="center">
                    {aspectRatioOptions.map((option) => (
                        <Button
                            key={option.value}
                            onClick={() => setAspectRatio(option.value)}
                            variant={aspectRatio == option.value ? "contained" : "outlined"}
                            endIcon={<MdAspectRatio />}
                        >
                            {option.text}
                        </Button>
                    ))}
                </Box>
            </Box>

            <Button variant="contained" onClick={onDone}>
                تم
            </Button>
        </Dialog>
    );
});
