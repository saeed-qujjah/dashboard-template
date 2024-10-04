import { Providers } from "./Providers";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import localFont from "next/font/local";
import "@/style/global.css";

export const metadata = {
    title: "Dashboard",
};

const tajawal = localFont({
    src: [
        {
            path: "../../../public/font/Tajawal-Regular.ttf",
            weight: "400",
            style: "normal",
        },
        {
            path: "../../../public/font/Tajawal-Medium.ttf",
            weight: "500",
        },
        {
            path: "../../../public/font/Tajawal-Bold.ttf",
            weight: "700",
            style: "normal",
        },
    ],
});

//function to get the translations
async function getMessages(locale: string) {
    try {
        return (await import(`../../../public/locales/${locale}/translation.json`)).default;
    } catch (error) {
        notFound();
    }
}

//function to generate the routes for all the locales
export async function generateStaticParams() {
    return ["en", "ar"].map((locale) => ({ locale }));
}

type LayoutProps = {
    children: ReactNode;
    params: { locale: string };
};

export default async function RootLayout({ children, params: { locale } }: LayoutProps) {
    const messages = await getMessages(locale);

    return (
        <html lang={locale} dir={`${locale == "ar" ? "rtl" : "ltr"}`} className={tajawal.className}>
            <body>
                <NextIntlClientProvider locale={locale} messages={messages}>
                    <Providers>{children}</Providers>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
