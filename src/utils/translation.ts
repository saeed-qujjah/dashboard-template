import { useMemo } from "react";
import { TranslatedItem, TranslatedItemsToBackend } from "./types";
import { useLocale } from "next-intl";

export const getDefaultTranslatedFormFields = (): TranslatedItemsToBackend[] => {
    return [
        {
            lang: "eng",
            value: "",
        },

        {
            lang: "ar",
            value: "",
        },
    ];
};

export const getTranslatedItemByKey = (names: TranslatedItem[] | TranslatedItemsToBackend[] = [], locale = "eng") => {
    const name = names.find((item) => item.lang == locale);
    if (name) return name.value;

    return "...";
};

export const getTranslateItemFunction = (locale = "eng") => {
    return (names: TranslatedItem[] | TranslatedItemsToBackend[]) => getTranslatedItemByKey(names, locale);
};

export const useTranslateItem = () => {
    let locale = useLocale();
    if(locale == "en") locale = "eng"

    const value = useMemo(() => {
        return {
            tt: getTranslateItemFunction(locale),
        };
    }, [locale]);

    return value;
};
