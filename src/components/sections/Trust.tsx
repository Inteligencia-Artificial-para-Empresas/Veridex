"use client";

import { motion, Variants } from "framer-motion";
import { useTranslations } from "next-intl";

export function Trust() {
  const t = useTranslations("Trust");

  const testimonials = [
    {
      name: t("test1_name"),
      text: t("test1_text"),
      role: t("test1_role"),
      // Paso 1: Usamos imágenes de prueba. Luego cámbialas por tus archivos
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: t("test2_name"),
      text: t("test2_text"),
      role: t("test2_role"),
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: t("test3_name"),
      text: t("test3_text"),
      role: t("test3_role"),
      image: "https://randomuser.me/api/portraits/men/85.jpg",
    },
  ];

  // Variantes para la animación en cascada
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="py-[120px] bg-background relative overflow-hidden">
      {/* Fondo decorativo */}
      <div className="absolute top-0 right-0 w-full max-w-[600px] h-[400px] bg-[radial-gradient(ellipse_at_top_right,_rgba(255,215,0,0.05)_0%,_transparent_70%)] pointer-events-none"></div>

      <div className="w-full max-w-[1200px] mx-auto px-7 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center max-w-[600px] mx-auto mb-16"
        >
          <h2 className="text-[clamp(32px,4vw,48px)] font-black tracking-tight mb-4 text-white">{t("title")}</h2>
          <p className="text-[16px] text-muted-40 leading-relaxed">{t("subtitle")}</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              className="group bg-background-100 p-8 rounded-[24px] border border-muted-6 relative hover:border-veridex/40 hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_12px_40px_rgba(255,215,0,0.05)] flex flex-col"
            >
              {/* Icono de Comillas */}
              <div className="absolute top-8 right-8 text-muted-10 group-hover:text-veridex/20 transition-colors duration-300">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>

              {/* Estrellas de 5/5 */}
              <div className="flex gap-1 text-veridex text-[14px] mb-6">
                {[...Array(5)].map((_, starIdx) => (
                  <span key={starIdx}>★</span>
                ))}
              </div>

              <p className="text-[15px] text-muted-70 mb-8 leading-[1.8] min-h-[90px] italic">"{testimonial.text}"</p>

              {/* Bloque de Usuario (mt-auto lo empuja siempre abajo) */}
              <div className="flex items-center gap-4 mt-auto pt-5 border-t border-muted-6">
                {/* Paso 2: El espacio de imagen actualizado */}
                <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full border border-muted-10 object-cover" />

                <div>
                  <div className="font-bold text-white text-[15px]">{testimonial.name}</div>
                  <div className="text-[13px] text-veridex font-medium mt-0.5">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
