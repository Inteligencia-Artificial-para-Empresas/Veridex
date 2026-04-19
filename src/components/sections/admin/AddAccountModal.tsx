"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Lock, DollarSign, Calendar, Eye, EyeOff, Loader2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createInventoryAccount } from "@/services/inventories";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddAccountModal({ isOpen, onClose }: Props) {
  const [showPass, setShowPass] = useState(false);
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    creation_cost: "",
    created_at: new Date().toISOString().split("T")[0],
  });

  const mutation = useMutation({
    mutationFn: createInventoryAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventory"] });
      onClose();
      resetForm();
    },
    onError: (error: any) => {
      alert("Error al guardar: " + error.message);
    },
  });

  const resetForm = () => {
    setFormData({
      email: "",
      password: "",
      creation_cost: "",
      created_at: new Date().toISOString().split("T")[0],
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      email: formData.email,
      password: formData.password,
      creation_cost: parseFloat(formData.creation_cost),
      created_at: formData.created_at,
      is_sold: false,
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            className="relative w-full max-w-lg bg-[#111] border border-white/10 rounded-[32px] overflow-hidden shadow-2xl"
          >
            <div className="p-8">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-2xl font-black italic tracking-tighter text-white uppercase">
                    NUEVA CUENTA <span className="text-yellow-500">BYBIT</span>
                  </h2>
                  <p className="text-xs text-white/40 font-bold uppercase tracking-widest mt-1 italic">Update Inventory Terminal</p>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-colors text-white/20 hover:text-white">
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Correo */}
                <div>
                  <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-2 ml-1">Correo Electrónico</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                    <input
                      required
                      type="email"
                      className="w-full bg-black border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-white focus:border-yellow-500/50 outline-none transition-all"
                      placeholder="ejemplo@bybit.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                {/* Clave */}
                <div>
                  <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-2 ml-1">Clave de Acceso</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
                    <input
                      required
                      type={showPass ? "text" : "password"}
                      className="w-full bg-black border border-white/10 rounded-2xl py-3.5 pl-12 pr-12 text-sm text-white focus:border-yellow-500/50 outline-none transition-all"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-yellow-500 transition-colors"
                    >
                      {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Costo */}
                  <div>
                    <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-2 ml-1">Costo (USD)</label>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-veridex" size={16} />
                      <input
                        required
                        type="number"
                        step="0.01"
                        className="w-full bg-black border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-white focus:border-veridex/50 outline-none transition-all"
                        placeholder="0.00"
                        value={formData.creation_cost}
                        onChange={(e) => setFormData({ ...formData, creation_cost: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Fecha */}
                  <div>
                    <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-2 ml-1">Fecha Creación</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-white" size={16} />
                      <input
                        required
                        type="date"
                        className="w-full bg-black border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-xs text-white/60 focus:border-yellow-500/50 outline-none transition-all"
                        value={formData.created_at}
                        onChange={(e) => setFormData({ ...formData, created_at: e.target.value })}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="uppercase cursor-pointer flex-1 py-4 rounded-2xl text-xs font-black text-white/40 hover:text-white hover:bg-white/5 transition-all"
                  >
                    cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={mutation.isPending}
                    className="uppercase cursor-pointer flex-[2] py-4 rounded-2xl text-xs font-black bg-yellow-500 text-black hover:bg-yellow-400 transition-all shadow-[0_0_20px_rgba(234,179,8,0.2)] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {mutation.isPending ? (
                      <div className="flex items-center justify-center gap-2">
                        <Loader2 className="animate-spin" size={16} />
                        <span>procesando...</span>
                      </div>
                    ) : (
                      "registrar cuenta"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
