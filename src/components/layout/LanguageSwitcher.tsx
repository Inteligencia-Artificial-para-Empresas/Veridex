"use client";
import { useRouter, usePathname } from "next/navigation";

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();

  const switchLanguage = (locale: string) => {
    const newPath = pathname.replace(/^\/(en|es)/, `/${locale}`);
    router.push(newPath);
  };

  return (
    <div>
      <button onClick={() => switchLanguage("es")}>ES</button>
      <button onClick={() => switchLanguage("en")}>EN</button>
    </div>
  );
}
