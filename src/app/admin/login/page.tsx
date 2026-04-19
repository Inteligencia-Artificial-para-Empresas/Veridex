"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Estado para el ojo
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      window.location.href = "/admin";
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[#050505] overflow-hidden">
      {/* Aurora Background */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-veridex/10 blur-[120px] rounded-full" />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 w-full max-w-md p-8 mx-4">
        {/* LOGO ESTILO NAV */}
        <div className="text-center mb-10">
          <span className="text-white font-black text-4xl tracking-tighter italic">
            VERI<span className="text-veridex">DEX</span>
          </span>
          <p className="text-[10px] text-muted-40 font-bold uppercase tracking-[0.4em] mt-2">Systems Administration</p>
        </div>

        <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 p-8 rounded-[32px] shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-[10px] font-bold text-muted-40 uppercase tracking-widest ml-1 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 text-sm text-white focus:border-veridex outline-none transition-all"
                required
                placeholder="admin@veridex.com"
              />
            </div>

            <div className="relative">
              <label className="block text-[10px] font-bold text-muted-40 uppercase tracking-widest ml-1 mb-2">Contraseña</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-12 bg-white/5 border border-white/10 rounded-xl px-4 pr-12 text-sm text-white focus:border-veridex outline-none transition-all"
                  required
                  placeholder="****************"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-40 hover:text-veridex transition-colors"
                >
                  {showPassword ? <EyeOff size={18} strokeWidth={2} /> : <Eye size={18} strokeWidth={2} />}
                </button>
              </div>
            </div>

            {error && <p className="text-red-400 text-xs font-medium text-center bg-red-400/10 py-2 rounded-lg border border-red-400/20">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-veridex text-black font-black text-sm rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center"
            >
              {loading ? "AUTENTICANDO..." : "ACCEDER AL SISTEMA"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
