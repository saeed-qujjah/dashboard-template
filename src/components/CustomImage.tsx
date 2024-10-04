import { Box, Skeleton, SkeletonProps } from "@mui/material";
import Image, { ImageProps } from "next/image";
import { ReactNode, useState } from "react";
import { MdPerson } from "react-icons/md";

type CustomImageProps = Omit<ImageProps, "onLoadingComplete"> & {
    /**
     * Whether to show a skeleton animation
     */
    skeletonProps?: SkeletonProps;

    /**
     * Sometimes image data needs to be fetched from the server, so src is empty.
     * But I don't want to display the empty avatar image.
     */
    isImageSrcLoading?: boolean;

    /**
     * Fallback element in case the image didn't load. (Either because of an error or the image's src is empty)
     */
    fallback?: "person" | ReactNode;
};

/**
 *
 * https://github.com/vercel/next.js/discussions/35675
 * https://vercel.com/templates/next.js/image-fallback
 * https://github.com/dvtng/react-loading-skeleton#the-height-of-my-container-is-off-by-a-few-pixels
 */
export const CustomImage = ({ isImageSrcLoading = false, skeletonProps = {}, fallback, ...props }: CustomImageProps) => {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    if (!isImageSrcLoading && (!props.src || isError)) {
        if (fallback == "person")
            return (
                <Box height="100%" fontSize="40px" width="100%" display="flex" alignItems="center" justifyContent="center" borderRadius="50%" bgcolor="rgb(229 231 235 / 1)">
                    <MdPerson />
                </Box>
            );
        else if (fallback) return fallback;
        return <Box height="100%" width="100%" display="flex" alignItems="center" justifyContent="center" bgcolor="rgb(229 231 235 / 1)" />;
    }

    return (
        <>
            {isLoading && <Skeleton variant="rectangular" {...skeletonProps} height="100%" />}
            {!isImageSrcLoading && (
                <Image
                    {...props}
                    alt={props.alt ?? ""}
                    style={{objectFit:"cover"}}
                    src={isError ? "" : props.src ?? ""}
                    onLoadingComplete={() => setIsLoading(false)}
                    onError={() => setIsError(true)}
                />
            )}
        </>
    );
};
