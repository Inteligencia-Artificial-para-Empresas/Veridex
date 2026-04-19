"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslations } from "next-intl";

export function CtaFinal() {
  const t = useTranslations("CtaFinal");

  // Mapeamos las ventajas (perks) desde el archivo de traducción
  const perks = [t("perk_1"), t("perk_2"), t("perk_3"), t("perk_4")];

  return (
    <section id="cta-final" className="py-[120px] bg-background-100 border-t border-muted-6 relative overflow-hidden">
      {/* Resplandor decorativo de fondo */}
      <div className="absolute bottom-[-150px] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[radial-gradient(ellipse_at_center,rgba(255,215,0,0.15)_0%,transparent_65%)] pointer-events-none z-0"></div>

      <div className="w-full max-w-[1200px] mx-auto px-7 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-background-200 border border-veridex/30 rounded-full py-1.5 px-[18px] text-[12px] font-bold tracking-wide uppercase text-veridex mb-8 shadow-[0_0_15px_rgba(255,215,0,0.1)]">
            <span className="w-2 h-2 rounded-full bg-veridex animate-pulse"></span>
            {t("badge")}
          </div>

          {/* Título Principal */}
          <h2 className="text-[clamp(36px,5vw,64px)] font-black leading-[1.08] tracking-tight mb-[24px] text-white">
            {t("title_part1")}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-veridex to-yellow-200">{t("title_highlight")}</span>
          </h2>

          {/* Descripción */}
          <p className="text-[17px] text-muted-60 max-w-[540px] mx-auto mb-12 leading-[1.7]">{t("description")}</p>

          {/* Botones de Acción */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-14">
            <Link
              href="/checkout"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl font-bold text-[16px] bg-veridex text-background hover:bg-veridex-dark hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(255,215,0,0.3)] transition-all duration-300"
            >
              {t("cta_primary")}
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="https://t.me/tu_usuario_telegram"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl font-bold text-[16px] bg-background-200 text-white border border-muted-10 hover:border-veridex/50 hover:text-veridex transition-all duration-300"
            >
              {t("cta_secondary")}
            </Link>
          </div>

          {/* Viñetas de Confianza (Perks) */}
          <div className="flex items-center justify-center gap-x-8 gap-y-4 flex-wrap max-w-[800px] mx-auto">
            {perks.map((perk, idx) => (
              <div key={idx} className="flex items-center gap-2 text-[14px] font-medium text-muted-40">
                <div className="w-5 h-5 rounded-full bg-veridex/10 flex items-center justify-center shrink-0">
                  <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor" className="text-veridex">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                {perk}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
