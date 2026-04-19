"use client";

import { motion } from "framer-motion";

export const SUPPORT_LINK = "https://t.me/tu_usuario_telegram"; // Enlace Único

export function TelegramFloat() {
  return (
    <motion.a
      href={SUPPORT_LINK}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ scale: 0, opacity: 0, y: 20 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-8 right-8 z-[999] w-16 h-16 bg-[#26A5E4] rounded-full flex items-center justify-center shadow-[0_10px_40px_rgba(38,165,228,0.5)] border-2 border-white/20 group"
    >
      {/* Efecto de Pulso Radioactivo */}
      <div className="absolute inset-0 rounded-full bg-[#26A5E4] animate-ping opacity-25 group-hover:opacity-40 transition-opacity"></div>

      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 2L11 13" />
        <path d="M22 2L15 22L11 13L2 9L22 2Z" />
      </svg>
    </motion.a>
  );
}
