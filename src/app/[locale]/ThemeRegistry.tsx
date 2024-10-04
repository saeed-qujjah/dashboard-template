"use client";
import { baseLightTheme } from "@/utils/theme";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { useLocale } from "next-intl";
import { useServerInsertedHTML } from "next/navigation";
import { PropsWithChildren, useState } from "react";
import rtlPlugin from "stylis-plugin-rtl";

// This implementation is from emotion-js
// https://github.com/emotion-js/emotion/issues/2928#issuecomment-1319747902
export default function ThemeRegistry({ children }: PropsWithChildren) {
    const locale = useLocale();
    const [{ cache, flush }] = useState(() => {
        const cacheRtl = createCache({
            key: "mui-style-rtl",
            stylisPlugins: [rtlPlugin],
        });

        const cacheLtr = createCache({
            key: "mui-style-ltr",
        });
        const cache = locale == "ar" ? cacheRtl : cacheLtr
        cache.compat = true;
        const prevInsert = cache.insert;

        let inserted: string[] = [];
        cache.insert = (...args) => {
            const serialized = args[1];
            if (cache.inserted[serialized.name] === undefined) {
                inserted.push(serialized.name);
            }
            return prevInsert(...args);
        };

        const flush = () => {
            const prevInserted = inserted;
            inserted = [];
            return prevInserted;
        };
        return { cache, flush };
    });

    useServerInsertedHTML(() => {
        const names = flush();
        if (names.length === 0) {
            return null;
        }
        let styles = "";
        for (const name of names) {
            styles += cache.inserted[name];
        }
        return (
            <style
                key={cache.key}
                data-emotion={`${cache.key} ${names.join(" ")}`}
                dangerouslySetInnerHTML={{
                    __html: styles,
                }}
            />
        );
    });

    return (
        <CacheProvider value={cache}>
            <ThemeProvider theme={baseLightTheme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </CacheProvider>
    );
}
