"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

// Enlace centralizado para soporte
const SUPPORT_LINK = "https://t.me/tu_usuario_telegram";

export default function CheckoutPage() {
  const t = useTranslations("Checkout");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleBinancePay = async () => {
    if (!email || !email.includes("@")) {
      alert("Por favor, introduce un email válido.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Hubo un error al conectar con Binance. Intenta de nuevo.");
      }
    } catch (err) {
      console.error(err);
      alert("Error de conexión.");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="pt-36 pb-24 min-h-screen relative overflow-hidden">
      {/* El fondo eléctrico lo hereda del Layout, pero aquí podemos añadir un resplandor extra */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[400px] bg-veridex/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="w-full max-w-[1200px] mx-auto px-7 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_420px] gap-16 items-start">
          {/* SECCIÓN IZQUIERDA: DETALLES Y PROCESO */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
            <header>
              <h1 className="text-[clamp(36px,5vw,56px)] font-black tracking-tighter leading-[0.9] mb-6">
                Acceso <span className="text-veridex">Latam Premium</span>
              </h1>
              <p className="text-muted-40 text-[19px] max-w-[580px] leading-relaxed">{t("subtitle")}</p>
            </header>

            {/* Beneficios en modo Glassmorphism */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((num) => (
                <div key={num} className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-veridex/10 flex items-center justify-center text-veridex group-hover:scale-110 transition-transform duration-300">
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                      <path d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-[15px] font-bold text-muted-70">{t(`include_${num}`)}</span>
                </div>
              ))}
            </div>

            {/* Proceso Step-by-Step */}
            <div className="relative p-10 rounded-[32px] bg-background-100/40 border border-muted-10 backdrop-blur-sm overflow-hidden">
              <h3 className="text-xl font-bold mb-10 flex items-center gap-3">
                <span className="w-2 h-6 bg-veridex rounded-full shadow-[0_0_12px_rgba(255,215,0,0.5)]"></span>
                {t("process_title")}
              </h3>

              <div className="space-y-12">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="relative flex gap-6 group">
                    <div className="flex flex-col items-center">
                      <div className="w-10 h-10 rounded-full bg-background-200 border border-muted-10 flex items-center justify-center text-veridex font-black z-10 transition-colors group-hover:border-veridex">
                        {s}
                      </div>
                      {s !== 3 && <div className="w-[1.5px] h-[calc(100%+3rem)] bg-muted-10 absolute top-10"></div>}
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-[17px] mb-1.5">{t(`step_${s}_title`)}</h4>
                      <p className="text-muted-40 text-[14px] leading-relaxed">{t(`step_${s}_desc`)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* SECCIÓN DERECHA: TARJETA DE PAGO STICKY */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="lg:sticky lg:top-36"
          >
            <div className="p-10 rounded-[44px] bg-white/[0.02] border border-white/[0.1] backdrop-blur-3xl shadow-[0_40px_100px_rgba(0,0,0,0.6)] relative overflow-hidden">
              <div className="text-center mb-10">
                <p className="text-muted-40 text-[12px] font-bold uppercase tracking-[0.2em] mb-4">{t("total_price")}</p>
                <div className="flex items-center justify-center gap-1">
                  <span className="text-[28px] font-bold text-muted-60 self-start mt-2">$</span>
                  <span className="text-[80px] font-black text-white leading-none tracking-tighter">199</span>
                  <span className="text-[22px] font-bold text-muted-40 self-end mb-3">.00</span>
                </div>
              </div>

              {/* Formulario de Captura */}
              <div className="space-y-6 mb-8">
                <div>
                  <label className="text-[11px] font-bold text-muted-40 uppercase tracking-widest ml-1">{t("email_label")}</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("email_placeholder")}
                    className="w-full mt-2.5 h-16 bg-white/5 border border-white/10 rounded-2xl px-5 text-white focus:border-veridex/50 focus:bg-white/[0.08] outline-none transition-all duration-300 placeholder:text-muted-10 font-medium"
                  />
                </div>

                {/* Botón Binance Pay Oficial */}
                <button
                  onClick={handleBinancePay}
                  disabled={isLoading}
                  className="w-full relative h-[72px] rounded-2xl bg-[#F3BA2F] hover:bg-[#ffca44] text-black font-black text-[18px] flex items-center justify-center gap-3 transition-all duration-500 shadow-[0_15px_45px_rgba(243,186,47,0.3)] hover:shadow-[0_20px_60px_rgba(243,186,47,0.5)] active:scale-[0.98] overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="w-6 h-6 border-4 border-black/20 border-t-black rounded-full animate-spin" />
                  ) : (
                    <>
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 3.016L3.016 12 12 20.984 20.984 12 12 3.016zm0 14.892L6.108 12 12 6.108 17.892 12 12 17.908z" />
                      </svg>
                      {t("pay_binance")}
                    </>
                  )}
                  {/* Rayo de luz animado */}
                  <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-30deg] group-hover:left-[150%] transition-all duration-1000 ease-in-out"></div>
                </button>
              </div>

              {/* Pie de Tarjeta */}
              <div className="pt-8 border-t border-white/5 space-y-4">
                <div className="flex items-center justify-center gap-6">
                  <div className="flex flex-col items-center">
                    <span className="text-white font-bold text-[14px]">BEP-20</span>
                    <span className="text-muted-60 text-[9px] uppercase tracking-widest font-bold">Binance Smart Chain</span>
                  </div>
                  <div className="w-[1px] h-8 bg-white/10"></div>
                  <div className="flex flex-col items-center">
                    <span className="text-white font-bold text-[14px]">TRC-20</span>
                    <span className="text-muted-60 text-[9px] uppercase tracking-widest font-bold">Tron Network</span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 text-muted-60 text-[12px] hover:text-white transition-colors cursor-pointer pt-2">
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <a href={SUPPORT_LINK} target="_blank" className="font-medium underline underline-offset-4 decoration-muted-10">
                    {t("disclaimer")}
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
