import { useTranslations } from 'next-intl'

export default function NoDataFound() {
  const t = useTranslations();
  return (
    <p className="tw-text-center tw-text-[34px] tw-px-10 tw-py-40 tw-font-bold">{t("noDataFound")}</p>
  )
}
