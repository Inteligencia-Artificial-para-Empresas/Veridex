"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { useTranslations } from "next-intl";

export function HowItWorks() {
  const t = useTranslations("HowItWorks");
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  const steps = [
    { num: "01", title: t("step1_title"), desc: t("step1_desc") },
    { num: "02", title: t("step2_title"), desc: t("step2_desc") },
    { num: "03", title: t("step3_title"), desc: t("step3_desc") },
    { num: "04", title: t("step4_title"), desc: t("step4_desc") },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } },
  };

  const stepVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  // Calcula el porcentaje de la línea según el hover
  const getLineWidth = () => {
    if (hoveredStep === null) return "0%";
    return `${(hoveredStep / (steps.length - 1)) * 100}%`;
  };

  return (
    <section id="how" className="py-[120px] bg-background relative overflow-hidden">
      <div className="absolute inset-0 hero-grid-bg opacity-20 pointer-events-none z-0"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[300px] bg-veridex/5 blur-[120px] pointer-events-none z-0"></div>

      <div className="w-full max-w-[1200px] mx-auto px-7 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.65 }}
          className="text-center max-w-[620px] mx-auto mb-24"
        >
          <div className="inline-flex items-center gap-2.5 text-[11px] font-bold tracking-[0.12em] uppercase text-veridex mb-[20px] before:content-[''] before:block before:w-[24px] before:h-[2px] before:bg-veridex before:rounded-full">
            {t("badge")}
          </div>
          <h2 className="text-[clamp(32px,4vw,52px)] font-black leading-[1.12] tracking-tight mb-5">
            {t("title_part1")}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-veridex to-yellow-200">{t("title_highlight")}</span>
          </h2>
          <p className="text-[16px] text-muted-60 leading-relaxed">{t("subtitle")}</p>
        </motion.div>

        <motion.div
          className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-0"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <div className="hidden lg:block absolute top-9.25 left-[12.5%] right-[12.5%] h-0.5 bg-background-200 -z-10 overflow-hidden rounded-full">
            <div
              className="absolute top-0 left-0 h-full bg-linear-to-r from-veridex/60 via-veridex to-veridex shadow-[0_0_10px_rgba(255,215,0,0.5)] transition-all duration-500 ease-out rounded-full"
              style={{ width: getLineWidth() }}
            ></div>
          </div>

          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              variants={stepVariants}
              onMouseEnter={() => setHoveredStep(idx)}
              onMouseLeave={() => setHoveredStep(null)}
              className="group flex flex-col items-center text-center px-[22px] relative z-10 cursor-default"
            >
              <div className="relative z-10 mb-[28px]">
                <div
                  className={`absolute inset-0 rounded-full border transition-all duration-500 scale-[1.3] ${hoveredStep === idx ? "border-veridex/40 bg-veridex/10" : "border-transparent bg-transparent"}`}
                ></div>

                <div
                  className={`w-[76px] h-[76px] rounded-full border-[1.5px] flex items-center justify-center text-[24px] font-black tracking-tight transition-all duration-300 relative z-10 ${
                    hoveredStep === idx || (hoveredStep !== null && idx <= hoveredStep)
                      ? "bg-background-200 border-veridex text-veridex shadow-[0_0_25px_rgba(255,215,0,0.2)]"
                      : "bg-background border-muted-10 text-white"
                  }`}
                >
                  {step.num}
                </div>
              </div>

              <h3
                className={`text-[17px] font-bold mb-3 tracking-tight transition-colors duration-300 ${hoveredStep === idx ? "text-veridex" : "text-white"}`}
              >
                {step.title}
              </h3>
              <p className="text-[14px] text-muted-40 leading-[1.6] font-medium transition-colors duration-300 group-hover:text-muted-60">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
