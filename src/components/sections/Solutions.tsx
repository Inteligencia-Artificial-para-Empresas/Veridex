"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function Solutions() {
  const solutions = [
    {
      tag: "KYC Core",
      title: "Verificación de Identidad",
      desc: "Valida documentos de identidad de más de 195 países con inteligencia artificial de última generación. Detecta fraudes en tiempo real antes del onboarding.",
      feats: [
        "OCR con 99.8% de precisión en 10.000+ documentos",
        "Detección de alteraciones y documentos falsificados",
        "Validación de fechas de vigencia y códigos MRZ/NFC",
      ],
      icon: (
        <svg viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="2" y="5" width="18" height="14" rx="2" />
          <path d="M2 9h18" />
          <path d="M6 13h4M6 16h3" />
          <circle cx="16" cy="13.5" r="2.5" />
        </svg>
      ),
    },
    {
      tag: "Compliance",
      title: "AML Screening",
      desc: "Monitorea personas y entidades en tiempo real contra más de 1.400 listas de sanciones globales, PEP y medios adversos.",
      feats: [
        "OFAC, ONU, UE, Interpol y 1.400+ listas globales",
        "Alertas de Personas Políticamente Expuestas (PEP)",
        "Monitoreo continuo post-onboarding en tiempo real",
      ],
      icon: (
        <svg viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M11 3L4 6.5V11C4 15 7.2 18.5 11 19.5C14.8 18.5 18 15 18 11V6.5L11 3Z" />
          <path d="M8 11L10 13L14 9" />
        </svg>
      ),
    },
    {
      tag: "Biometría",
      title: "Verificación Biométrica",
      desc: "Reconocimiento facial de alta precisión con detección de vida activa. Previene ataques de spoofing con fotos, videos y deepfakes generados por IA.",
      feats: [
        "Liveness detection activo y pasivo",
        "Comparación 1:1 entre selfie y documento oficial",
        "Detección de deepfakes y ataques de inyección",
      ],
      icon: (
        <svg viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="11" cy="9" r="4" />
          <path d="M4 19C4 16.2 7.1 14 11 14C14.9 14 18 16.2 18 19" />
          <path d="M15 5L17 3M7 5L5 3M11 3V1" />
        </svg>
      ),
    },
    {
      tag: "Documentos",
      title: "Verificación Documental",
      desc: "Autentica pasaportes, DNIs, licencias y documentos corporativos. Extrae y estructura datos automáticamente para tu sistema de back-office.",
      feats: [
        "Autenticación de hologramas, UV y microimpresiones",
        "Extracción de datos estructurados y validación cruzada",
        "Verificación de vigencia y firma digital de documentos",
      ],
      icon: (
        <svg viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M13 3H6a2 2 0 00-2 2v14a2 2 0 002 2h10a2 2 0 002-2V9l-5-6z" />
          <path d="M13 3v6h6" />
          <path d="M8 13h6M8 16h4" />
        </svg>
      ),
    },
  ];

  return (
    <section id="solutions" className="py-[110px] bg-background-100 border-y border-muted-6">
      <div className="w-full max-w-[1200px] mx-auto px-7">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-[60px]">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-[500px]">
            <div className="inline-flex items-center gap-2.5 text-[11px] font-bold tracking-[0.12em] uppercase text-veridex mb-[18px] before:content-[''] before:block before:w-[22px] before:h-[2px] before:bg-veridex before:rounded-sm">
              Soluciones
            </div>
            <h2 className="text-[clamp(30px,4vw,52px)] font-extrabold leading-[1.12] tracking-tight">
              Una suite completa para <span className="text-veridex">cumplimiento total</span>
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[14px] text-muted-40 max-w-[260px] lg:text-right leading-[1.7] shrink-0"
          >
            Herramientas de verificación diseñadas para bancos, fintechs, cripto-exchanges, marketplaces y más.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[18px]">
          {solutions.map((sol, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group bg-background border border-muted-6 rounded-[16px] p-[38px] cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:border-veridex-30 hover:shadow-[0_16px_48px_rgba(0,0,0,0.45),0_0_0_1px_rgba(255,215,0,0.1)]"
            >
              <div className="w-[50px] h-[50px] bg-veridex-8 border border-veridex/10 rounded-[12px] flex items-center justify-center mb-[26px] transition-all duration-300 group-hover:bg-veridex-15 group-hover:border-veridex-30">
                <div className="w-[22px] h-[22px] text-veridex">{sol.icon}</div>
              </div>
              <div className="text-[10px] font-bold tracking-[0.1em] uppercase text-veridex mb-2">{sol.tag}</div>
              <h3 className="text-[21px] font-bold tracking-tight mb-3">{sol.title}</h3>
              <p className="text-[14px] text-muted-40 leading-[1.75] mb-6">{sol.desc}</p>

              <div className="flex flex-col gap-[7px] mb-7">
                {sol.feats.map((feat, fIdx) => (
                  <div
                    key={fIdx}
                    className="flex items-center gap-2 text-[13px] text-muted-70 before:content-[''] before:w-[5px] before:h-[5px] before:bg-veridex before:rounded-full before:shrink-0"
                  >
                    {feat}
                  </div>
                ))}
              </div>

              <Link
                href="#"
                className="inline-flex items-center gap-[5px] text-[13px] font-semibold text-veridex transition-all duration-300 group-hover:gap-2.5"
              >
                Ver solución &rarr;
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
