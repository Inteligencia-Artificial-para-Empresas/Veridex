"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

export function Navbar() {
  const t = useTranslations("Navbar");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Mapeamos los enlaces según el idioma
  const navLinks = [
    { label: t("link_benefits"), href: "#ventajas" },
    { label: t("link_process"), href: "#how" },
    { label: t("link_pricing"), href: "#pricing" },
    { label: t("link_faq"), href: "#faq" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Función para cambiar de idioma
  const toggleLanguage = () => {
    const nextLocale = locale === "es" ? "en" : "es";
    // Reemplaza el segmento del idioma actual en la URL por el nuevo
    const newPathname = pathname.replace(`/${locale}`, `/${nextLocale}`);
    router.replace(newPathname);
  };

  return (
    <>
      {/* Banner de Anuncios Superior */}
      <div className="bg-background-200 border-b border-muted-10 text-center px-6 py-2.5 text-[13px] text-muted-80 relative z-[901] flex items-center justify-center gap-2">
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
        {t("banner_text")}
        <Link href="#pricing" className="text-veridex font-semibold ml-1 hover:opacity-80 transition-opacity">
          {t("banner_cta")} &rarr;
        </Link>
      </div>

      {/* Navegación Principal */}
      <nav
        className={`fixed left-0 right-0 z-[900] transition-all duration-300 ease-out border-b ${
          isScrolled
            ? "top-0 bg-background/90 backdrop-blur-md py-4 border-muted-6 shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
            : "top-[40px] bg-transparent py-5 border-transparent"
        }`}
      >
        <div className="w-full max-w-[1200px] mx-auto px-7 flex items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="w-[36px] h-[36px] bg-veridex rounded-lg flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(255,215,0,0.15)] group-hover:shadow-[0_0_20px_rgba(255,215,0,0.3)] transition-shadow">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M9 1.5L2 4.5V9C2 13 5.2 16.5 9 17.5C12.8 16.5 16 13 16 9V4.5L9 1.5Z" fill="#0A0A0A" />
                <path d="M6 9L7.8 11L12 7" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="text-[20px] font-black tracking-tight text-white">
              VERI<span className="text-veridex">DEX</span>
            </span>
          </Link>

          {/* Links de Escritorio */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((item, idx) => (
              <li key={idx}>
                <Link
                  href={item.href}
                  className="text-[14px] font-medium text-muted-80 hover:text-white transition-colors relative after:content-[''] after:absolute after:-bottom-[4px] after:left-0 after:w-0 after:h-[2px] after:bg-veridex after:transition-all hover:after:w-full"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Botones Derecha (Escritorio) */}
          <div className="hidden md:flex items-center gap-5 shrink-0">
            {/* Selector de Idioma */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 text-[13px] font-bold text-muted-80 hover:text-white uppercase transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              {locale === "es" ? "EN" : "ES"}
            </button>

            <Link
              href="https://t.me/tu_usuario_telegram"
              target="_blank"
              className="text-[14px] font-medium text-muted-40 hover:text-white transition-colors"
            >
              {t("btn_support")}
            </Link>

            <Link
              href="/checkout"
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl font-bold text-[14px] bg-veridex text-background hover:bg-veridex-dark hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(255,215,0,0.25)] transition-all duration-300"
            >
              {t("btn_buy")}
            </Link>
          </div>

          <button
            className="flex md:hidden flex-col justify-center gap-[6px] w-8 h-8 cursor-pointer z-50 relative"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menú"
          >
            <span
              className={`block h-[2px] w-6 bg-white rounded-sm transition-all duration-300 ${isMobileMenuOpen ? "rotate-45 translate-y-[8px]" : ""}`}
            ></span>
            <span
              className={`block h-[2px] w-6 bg-white rounded-sm transition-all duration-300 ${isMobileMenuOpen ? "opacity-0" : "opacity-100"}`}
            ></span>
            <span
              className={`block h-[2px] w-6 bg-white rounded-sm transition-all duration-300 ${isMobileMenuOpen ? "-rotate-45 -translate-y-[8px]" : ""}`}
            ></span>
          </button>
        </div>
      </nav>

      {/* Menú Móvil Desplegable (Framer Motion) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[890] bg-background/95 backdrop-blur-xl md:hidden pt-[120px] px-7"
          >
            <ul className="flex flex-col gap-6 text-center">
              {navLinks.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-xl font-medium text-muted-60 hover:text-white transition-colors block py-2"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex flex-col gap-4 mt-10">
              {/* Botón de Idioma (Móvil) */}
              <button
                onClick={() => {
                  toggleLanguage();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full py-4 text-center rounded-xl font-bold text-[16px] bg-background-200 text-white border border-muted-10 flex items-center justify-center gap-2"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                Cambiar a {locale === "es" ? "English" : "Español"}
              </button>

              <Link
                href="https://t.me/tu_usuario_telegram"
                target="_blank"
                className="w-full py-4 text-center rounded-xl font-bold text-[16px] bg-transparent text-white border border-muted-10"
              >
                {t("btn_support")}
              </Link>
              <Link href="/checkout" className="w-full py-4 text-center rounded-xl font-bold text-[16px] bg-veridex text-background">
                {t("btn_buy")}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
