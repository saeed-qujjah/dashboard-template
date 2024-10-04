import { create } from "zustand";

interface MediaState {
    /**
     * This is useful in case i want to prevent form submission when media is being uploaded.
     */
    isUploading: boolean;
    setIsUploading: (value: boolean) => void;
}

export const useMediaStore = create<MediaState>()((set) => ({
    isUploading: false,
    setIsUploading(value) {
        set({
            isUploading: value,
        });
    },
}));

export const setIsUploading = (value: boolean) => useMediaStore.getState().setIsUploading(value);
