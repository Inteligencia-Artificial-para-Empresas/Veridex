import { getRequestConfig } from "next-intl/server";

const locales = ["en", "es"];

export default getRequestConfig(async ({ requestLocale }) => {
  let currentLocale = await requestLocale;

  if (!currentLocale || !locales.includes(currentLocale)) {
    currentLocale = "es";
  }

  return {
    locale: currentLocale,
    messages: (await import(`./messages/${currentLocale}.json`)).default,
  };
});
