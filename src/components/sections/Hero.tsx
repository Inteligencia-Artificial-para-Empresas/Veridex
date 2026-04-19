"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslations } from "next-intl";

export function Hero() {
  const t = useTranslations("Hero");

  return (
    <section className="min-h-screen flex items-center pt-[140px] pb-[90px] relative overflow-hidden bg-background">
      {/* Fondo con gradiente sutil y grid */}
      <div className="absolute inset-0 hero-grid-bg pointer-events-none z-0 opacity-40"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-[radial-gradient(ellipse_at_top,_rgba(255,215,0,0.15)_0%,_transparent_70%)] pointer-events-none z-0"></div>

      <div className="w-full max-w-[1200px] mx-auto px-7 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[60px] items-center text-center lg:text-left">
          {/* Columna Izquierda: Copywriting y CTAs */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }}>
            {/* Badge de Estado */}
            <div className="inline-flex items-center gap-2 bg-background-200 border border-muted-10 rounded-full py-1.5 px-4 pl-2 text-[12px] font-semibold text-white mb-7 shadow-sm">
              <span className="w-[8px] h-[8px] bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.8)]"></span>
              {t("badge")}
            </div>

            <h1 className="text-[clamp(42px,5.5vw,72px)] font-black leading-[1.05] tracking-tight mb-[24px]">
              {t("title_part1")} <span className="text-transparent bg-clip-text bg-gradient-to-r from-veridex to-yellow-200">Bybit</span>
              <br />
              {t("title_part2")}
            </h1>

            <p className="text-[17px] text-muted-60 leading-relaxed max-w-[480px] mb-10 mx-auto lg:mx-0">{t("description")}</p>

            {/* Botones de Acción */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10 justify-center lg:justify-start">
              <Link
                href="/checkout"
                className="inline-flex justify-center items-center gap-2 px-8 py-4 rounded-xl font-bold text-[15px] bg-veridex text-background hover:bg-veridex-dark transition-all duration-300 shadow-[0_0_24px_rgba(255,215,0,0.25)] hover:shadow-[0_0_32px_rgba(255,215,0,0.4)] hover:-translate-y-1"
              >
                {t("cta_primary")}
                <svg
                  width="16"
                  height="16"
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
                href="#ventajas"
                className="inline-flex justify-center items-center gap-2 px-8 py-4 rounded-xl font-bold text-[15px] bg-background-100 text-white border border-muted-10 hover:border-veridex hover:text-veridex transition-all duration-300"
              >
                {t("cta_secondary")}
              </Link>
            </div>

            {/* Social Proof Integrado */}
            <div className="flex items-center justify-center lg:justify-start gap-4">
              <div className="flex -space-x-3">
                {[45, 68, 32, 91].map((id, i) => (
                  <img
                    key={i}
                    src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? "men" : "women"}/${id}.jpg`}
                    alt="User"
                    className="w-10 h-10 rounded-full border-2 border-background object-cover"
                  />
                ))}
              </div>
              <div className="text-left">
                <div className="flex gap-0.5 text-veridex text-[14px]">
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                  <span>★</span>
                </div>
                <p className="text-[12px] text-muted-40 font-medium mt-0.5">{t("social_proof")}</p>
              </div>
            </div>
          </motion.div>

          {/* Columna Derecha: Mockup Visual Abastracto */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:flex justify-end items-center relative perspective-[1200px]"
          >
            {/* Tarjeta Principal Mockup */}
            <div className="relative w-full max-w-[480px] rounded-[28px] bg-background-100/60 border border-muted-10 p-9 shadow-[0_32px_80px_rgba(0,0,0,0.5)] backdrop-blur-lg transform transition-transform hover:rotate-y-[-6deg] hover:rotate-x-[6deg] duration-500 ease-out overflow-hidden">
              {/* Resplandor interno decorativo intensificado */}
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-veridex/20 blur-3xl rounded-full pointer-events-none z-0"></div>

              {/* Cabecera del Mockup */}
              <div className="flex justify-between items-start mb-9 border-b border-muted-6 pb-7 relative z-10">
                <div className="flex items-center gap-4.5">
                  {/* Icono Cripto con Glow */}
                  <div className="w-13 h-13 rounded-[14px] bg-veridex/10 border border-veridex/25 flex items-center justify-center text-veridex font-bold text-2xl shadow-[0_0_15px_rgba(255,215,0,0.2)]">
                    ₿
                  </div>
                  <div>
                    <h3 className="text-white font-black text-[17px] tracking-tight">Bybit Premium</h3>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      {/* Badge KYC Verificado */}
                      <span className="w-4.5 h-4.5 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30">
                        <svg className="w-2.5 h-2.5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                        </svg>
                      </span>
                      <span className="text-[12px] font-semibold text-green-400">KYC Lvl 2 Verified</span>
                    </div>
                  </div>
                </div>
                {/* Badge Estado Activo Mono */}
                <div className="bg-background-200 px-3.5 py-2 rounded-md border border-muted-6 text-[10px] font-mono font-bold text-veridex animate-pulse-dot tracking-widest">
                  {t("status_active")}
                </div>
              </div>

              {/* Cuerpo del Mockup: Datos Reales Simulados */}
              <div className="space-y-7 relative z-10">
                {/* Sección de Límites */}
                <div>
                  <div className="flex justify-between items-center mb-2.5">
                    <div className="text-[11px] text-muted-40 uppercase tracking-wider font-bold">{t("limits")}</div>
                    <div className="text-[12px] font-bold text-white tracking-tight">{t("limit_max")}</div>
                  </div>
                  {/* Barra de progreso animada al 85% */}
                  <div className="h-2.5 w-full bg-background-200 rounded-full overflow-hidden border border-muted-6">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "85%" }}
                      transition={{ duration: 1.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className="h-full bg-gradient-to-r from-veridex-dark to-veridex rounded-full shadow-[0_0_10px_rgba(255,215,0,0.4)]"
                    ></motion.div>
                  </div>
                </div>

                {/* Sección de Actividad Reciente (CRO: Muestra éxito) */}
                <div className="pt-3 border-t border-muted-6/50">
                  <div className="text-[11px] text-muted-40 uppercase tracking-wider font-bold mb-4">{t("recent_activity")}</div>

                  <div className="space-y-3.5">
                    {/* Fila 1: Ganancias de Futuros */}
                    <div className="flex items-center justify-between bg-background-200/50 p-4 rounded-xl border border-muted-6 hover:border-muted-10 transition-colors">
                      <div className="flex items-center gap-3.5">
                        <div className="w-8 h-8 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M23 6l-9.5 9.5-5-5L1 18" />
                            <path d="M17 6h6v6" />
                          </svg>
                        </div>
                        <div className="text-[13px] font-medium text-white">{t("futures_profit")}</div>
                      </div>
                      <div className="text-[14px] font-bold text-green-400 tracking-tight">+340.50 USDT</div>
                    </div>

                    {/* Fila 2: Operación P2P Exitosa */}
                    <div className="flex items-center justify-between bg-background-200/50 p-4 rounded-xl border border-muted-6 hover:border-muted-10 transition-colors">
                      <div className="flex items-center gap-3.5">
                        <div className="w-8 h-8 rounded-full bg-veridex/10 border border-veridex/20 flex items-center justify-center text-veridex">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M16 3h5v5" />
                            <path d="M8 3H3v5" />
                            <path d="M12 21v-9" />
                            <path d="M8 21h8" />
                          </svg>
                        </div>
                        <div className="text-[13px] font-medium text-white">{t("p2p_trade")}</div>
                      </div>
                      <div className="flex items-center gap-1.5 text-[12px] font-semibold text-green-400">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                        </span>
                        {t("status_success")}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Elemento Flotante Satélite (CRO: Refuerza beneficio) */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              className="absolute -bottom-8 -left-10 bg-background-200/90 border border-muted-10 px-6 py-4 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex items-center gap-3.5 backdrop-blur-md z-20"
            >
              <div className="w-10 h-10 rounded-full bg-green-500/15 flex items-center justify-center text-green-400 border border-green-500/25 shadow-[0_0_15px_rgba(74,222,128,0.15)]">
                <svg className="w-5.5 h-5.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <p className="text-[11px] text-muted-60 font-semibold uppercase tracking-wider">{t("ready_to_trade")}</p>
                <p className="text-[15px] font-extrabold text-white text-left tracking-tight mt-0.5">{t("instant_access")}</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
