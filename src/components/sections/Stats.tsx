"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, animate, Variants } from "framer-motion";
import { useTranslations } from "next-intl";

function AnimatedCounter({ from = 0, to, suffix = "", decimals = 0 }: { from?: number; to: number; suffix?: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView) {
      const controls = animate(from, to, {
        duration: 2.5,
        ease: [0.22, 1, 0.36, 1],
        onUpdate: (val) => {
          if (ref.current) {
            ref.current.textContent = val.toFixed(decimals).toLocaleString() + suffix;
          }
        },
      });
      return () => controls.stop();
    }
  }, [inView, from, to, suffix, decimals]);

  return <span ref={ref} />;
}

export function Stats() {
  const t = useTranslations("Stats");

  const stats = [
    { target: 3142, suffix: "", decimals: 0, desc: t("stat_delivered") },
    { target: 2.0, suffix: t("stat_limit_suffix"), decimals: 1, desc: t("stat_limit") },
    { target: 5.2, suffix: t("stat_time_suffix"), decimals: 1, desc: t("stat_time") },
    { target: 1.8, suffix: t("stat_support_suffix"), decimals: 1, desc: t("stat_support") },
    { target: 100, suffix: t("stat_leverage_suffix"), decimals: 0, desc: t("stat_leverage") },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section className="py-20 bg-transparent relative overflow-hidden">
      {/* Eliminamos el grid de fondo aquí para que se vea el global detrás */}
      <div className="w-full max-w-[1400px] mx-auto px-7 relative z-10">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {stats.map((stat, idx) => (
            <motion.div key={idx} variants={itemVariants} className="relative group">
              <div className="absolute inset-0 bg-veridex/5 blur-2xl rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative h-full py-10 px-6 flex flex-col items-center justify-center text-center bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl rounded-[24px] transition-all duration-300 group-hover:bg-white/[0.06] group-hover:border-white/[0.15]">
                <div className="text-[clamp(28px,3vw,36px)] font-black text-white leading-none mb-3 tracking-tighter">
                  <AnimatedCounter to={stat.target} suffix={stat.suffix} decimals={stat.decimals} />
                </div>

                <div className="text-[11px] font-bold text-muted-40 uppercase tracking-[0.15em] flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-veridex shadow-[0_0_8px_rgba(255,215,0,0.6)]" />
                  {stat.desc}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
