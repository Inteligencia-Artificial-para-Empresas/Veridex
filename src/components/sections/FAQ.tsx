"use client";

import { useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import Link from "next/link";

export function FAQ() {
  const t = useTranslations("FAQ");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = Array.from({ length: 8 }, (_, i) => ({
    q: t(`q${i + 1}`),
    a: t(`a${i + 1}`),
  }));

  // Dividimos las preguntas en dos grupos para el grid de 2 columnas
  const firstCol = faqs.slice(0, 4);
  const secondCol = faqs.slice(4, 8);

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <section id="faq" className="py-[120px] bg-background relative border-y border-muted-6">
      <div className="w-full max-w-[1200px] mx-auto px-7 relative z-10">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2.5 text-[11px] font-bold tracking-[0.12em] uppercase text-veridex mb-[20px]">
            {t("badge")}
          </div>
          <h2 className="text-[clamp(32px,4vw,48px)] font-black tracking-tight mb-4 text-white">{t("title")}</h2>
          <p className="text-[16px] text-muted-40 leading-relaxed max-w-[500px] mx-auto">{t("subtitle")}</p>
        </div>

        {/* Grid Responsivo de 2 Columnas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4 items-start">
          {[firstCol, secondCol].map((column, colIdx) => (
            <div key={colIdx} className="flex flex-col gap-4">
              {column.map((faq, i) => {
                // El índice real sumando el desfase de la segunda columna
                const realIdx = colIdx === 0 ? i : i + 4;
                const isOpen = openIndex === realIdx;

                return (
                  <motion.div
                    key={realIdx}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={itemVariants}
                    className={`group border rounded-[20px] overflow-hidden transition-all duration-300 ${
                      isOpen
                        ? "border-veridex/40 bg-background-100 shadow-[0_12px_40px_rgba(0,0,0,0.3)]"
                        : "border-muted-6 bg-transparent hover:border-muted-10"
                    }`}
                  >
                    <button
                      onClick={() => setOpenIndex(isOpen ? null : realIdx)}
                      className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                    >
                      <span
                        className={`font-bold text-[15px] leading-snug transition-colors duration-300 ${isOpen ? "text-veridex" : "text-muted-70 group-hover:text-white"}`}
                      >
                        {faq.q}
                      </span>
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${
                          isOpen ? "bg-veridex text-background rotate-180" : "bg-muted-10 text-muted-40"
                        }`}
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "circOut" }}
                        >
                          <div className="px-6 pb-6 text-[14px] text-muted-40 leading-relaxed border-t border-muted-6/40 pt-4 mx-6">{faq.a}</div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Footer Support Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 p-1 bg-gradient-to-r from-muted-6 via-veridex/20 to-muted-6 rounded-[24px]"
        >
          <div className="bg-background-100 p-8 rounded-[23px] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 bg-veridex/10 rounded-full flex items-center justify-center text-veridex">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <div className="text-left">
                <h3 className="text-white font-bold text-[18px]">{t("more_questions_title")}</h3>
                <p className="text-muted-40 text-[14px]">{t("more_questions_desc")}</p>
              </div>
            </div>
            <Link
              href="https://t.me/tu_usuario_telegram"
              target="_blank"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-bold text-[14px] bg-veridex text-background hover:bg-veridex-dark transition-all duration-300 shadow-[0_8px_20px_rgba(255,215,0,0.15)]"
            >
              {t("contact_support")}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
