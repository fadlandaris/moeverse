import { defaultLocale, hasLocale } from "@/i18n/getDictionary";
import MarketingLayout from "@/layouts/MarketingLayout";
import LangToggle from "@/components/reusable/LangToggle";

const LocaleLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) => {
  const { locale } = await params;
  const validLocale = hasLocale(locale) ? locale : defaultLocale;

  return (
    <MarketingLayout>
      <LangToggle currentLocale={validLocale} />
      {children}
    </MarketingLayout>
  );
}

export default LocaleLayout
