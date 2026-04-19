"use client";

import { motion, Variants } from "framer-motion";
import { useTranslations } from "next-intl";

export function Advantages() {
  const t = useTranslations("Advantages");

  const benefits = [
    {
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      ),
      title: t("ben1_title"),
      desc: t("ben1_desc"),
    },
    {
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0012 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75z"
          />
        </svg>
      ),
      title: t("ben2_title"),
      desc: t("ben2_desc"),
    },
    {
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
          />
        </svg>
      ),
      title: t("ben3_title"),
      desc: t("ben3_desc"),
    },
    {
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
          />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      title: t("ben4_title"),
      desc: t("ben4_desc"),
    },
    {
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
          />
        </svg>
      ),
      title: t("ben5_title"),
      desc: t("ben5_desc"),
    },
    {
      icon: (
        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      title: t("ben6_title"),
      desc: t("ben6_desc"),
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section id="ventajas" className="py-[120px] bg-background relative overflow-hidden">
      <div className="w-full max-w-[1200px] mx-auto px-7 relative z-10">
        {/* Encabezado */}
        <div className="text-center max-w-[700px] mx-auto mb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}>
            <div className="inline-flex items-center gap-2.5 text-[11px] font-bold tracking-[0.12em] uppercase text-veridex mb-[20px] before:content-[''] before:block before:w-[24px] before:h-[2px] before:bg-veridex before:rounded-full">
              {t("badge")}
            </div>
            <h2 className="text-[clamp(32px,4vw,48px)] font-black leading-[1.12] tracking-tight mb-5 text-white">
              {t("title_part1")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-veridex to-yellow-200">{t("title_highlight")}</span>
            </h2>
            <p className="text-[16px] text-muted-60 leading-relaxed">{t("subtitle")}</p>
          </motion.div>
        </div>

        {/* Grid de Ventajas */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {benefits.map((benefit, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="group bg-background-100 p-8 rounded-[24px] border border-muted-6 transition-all duration-300 hover:border-veridex/40 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(255,215,0,0.05)] relative overflow-hidden"
            >
              {/* Resplandor interno on hover */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-veridex/10 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

              <div className="w-14 h-14 bg-background-200 border border-muted-10 rounded-xl flex items-center justify-center text-veridex mb-6 group-hover:scale-110 group-hover:bg-veridex/10 transition-all duration-300">
                <div className="w-7 h-7">{benefit.icon}</div>
              </div>
              <h3 className="text-[18px] font-bold text-white mb-3 tracking-tight">{benefit.title}</h3>
              <p className="text-[14px] text-muted-40 leading-[1.7]">{benefit.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
