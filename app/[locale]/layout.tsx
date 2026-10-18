import LocaleLayout from "@/layouts/LocaleLayout";
import { locales } from "@/i18n/getDictionary";

export const generateStaticParams = () =>
  locales.map((locale) => ({ locale }));

const layout = ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) => {
  return (
    <LocaleLayout params={params}>
      {children}
    </LocaleLayout>
  )
}

export default layout
