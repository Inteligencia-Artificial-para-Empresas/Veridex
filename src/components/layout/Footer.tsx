"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("Footer");
  const currentYear = new Date().getFullYear();

  // Mapeamos los enlaces desde el archivo de traducción
  const footerLinks = [
    {
      title: t("col1_title"),
      links: [
        { label: t("col1_link1"), href: "/checkout" },
        { label: t("col1_link2"), href: "#how" },
        { label: t("col1_link3"), href: "#pricing" },
      ],
    },
    {
      title: t("col2_title"),
      links: [
        { label: t("col2_link1"), href: "https://t.me/tu_usuario_telegram" },
        { label: t("col2_link2"), href: "#faq" },
        { label: t("col2_link3"), href: "#" }, // Ej: Link a un bot de auto-reemplazo
      ],
    },
    {
      title: t("col3_title"),
      links: [
        { label: t("col3_link1"), href: "#" },
        { label: t("col3_link2"), href: "#" },
      ],
    },
  ];

  return (
    <footer className="pt-20 pb-10 border-t border-muted-6 bg-background">
      <div className="w-full max-w-[1200px] mx-auto px-7">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[300px_repeat(3,1fr)] gap-10 mb-16">
          {/* Brand Info */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1 pr-0 lg:pr-8">
            <Link href="/" className="flex items-center gap-2.5 shrink-0 group mb-4">
              <div className="w-[34px] h-[34px] bg-veridex rounded-lg flex items-center justify-center shrink-0">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M9 1.5L2 4.5V9C2 13 5.2 16.5 9 17.5C12.8 16.5 16 13 16 9V4.5L9 1.5Z" fill="#0A0A0A" />
                  <path d="M6 9L7.8 11L12 7" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <span className="text-[20px] font-black tracking-tight text-white">
                VERI<span className="text-veridex">DEX</span>
              </span>
            </Link>

            <p className="text-[14px] text-muted-40 leading-[1.7] mb-[24px]">{t("brand_desc")}</p>

            {/* Redes Sociales (Ajustadas a Telegram y Twitter, típicas de cripto) */}
            <div className="flex gap-2.5">
              {[
                {
                  name: "Telegram",
                  href: "https://t.me/tu_usuario_telegram",
                  path: "M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a50.4 50.4 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z",
                },
                {
                  name: "Twitter / X",
                  href: "#",
                  path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
                },
              ].map((soc, idx) => (
                <Link
                  key={idx}
                  href={soc.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={soc.name}
                  className="w-[36px] h-[36px] bg-background-200 border border-muted-6 rounded-[8px] flex items-center justify-center transition-all hover:border-veridex/40 hover:bg-veridex/10 group/soc hover:-translate-y-0.5"
                >
                  <svg viewBox="0 0 24 24" className="w-[16px] h-[16px] fill-muted-40 transition-colors group-hover/soc:fill-veridex">
                    <path d={soc.path} />
                  </svg>
                </Link>
              ))}
            </div>
          </div>

          {/* Links Dinámicos */}
          {footerLinks.map((col, idx) => (
            <div key={idx}>
              <div className="text-[12px] font-bold tracking-[0.1em] uppercase text-white mb-6">{col.title}</div>
              <ul className="flex flex-col gap-[14px]">
                {col.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link href={link.href} className="text-[14px] font-medium text-muted-40 hover:text-veridex transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Legal & Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-muted-6 gap-6 text-center md:text-left">
          <p className="text-[13px] text-muted-40">
            © {currentYear} {t("copyright")}
          </p>
          <div className="flex gap-[24px] flex-wrap justify-center">
            {[
              { label: t("legal_terms"), href: "#" },
              { label: t("legal_privacy"), href: "#" },
            ].map((legal, idx) => (
              <Link key={idx} href={legal.href} className="text-[13px] text-muted-40 hover:text-white transition-colors">
                {legal.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
