import { httpClient } from "@/lib/http-client";
import { setIsUploading } from "@/modules/media/media-store";
import { AxiosRequestConfig } from "axios";

type ImageUploadResponse = {
    url: string;
};

type UploadImageProps = {
    file: File;
    fileType: "image" | "svg";
};

export const uploadImage = async (options: UploadImageProps, config?: AxiosRequestConfig<FormData>) => {
    setIsUploading(true);
    const { file } = options;

    const formData = new FormData();
    formData.set("image", file);

    const response = await httpClient
        .post<ImageUploadResponse>(process.env.NEXT_PUBLIC_BASE_API_URL + "/media/upload-image", formData, config)
        .finally(() => setIsUploading(false));

    return response.data.url;
};

// https://stackoverflow.com/questions/62179675/how-to-convert-image-source-into-a-javascript-file-object
export const downloadFileFromURL = async (url: string): Promise<File> => {
    const response = await fetch(url);
    const contentType = response.headers.get("content-type") as any;
    const blob = await response.blob();

    return new File([blob], url, { type: contentType });
};
