"use client";

import { useState, useMemo, useEffect } from "react";
import { Eye, EyeOff, Calendar, ShieldCheck, Search, Filter, Trash2, Edit2, Check, X, Loader2 } from "lucide-react";
import { BybitAccount } from "@/types/account";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAccount, updateAccount } from "@/services/inventories";

export default function InventoryCards({ data }: { data: BybitAccount[] }) {
  const queryClient = useQueryClient();
  const [showPass, setShowPass] = useState<string | number | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"todos" | "disponibles" | "vendidas">("todos");
  const [dateFilter, setDateFilter] = useState("");

  const [editingId, setEditingId] = useState<string | number | null>(null);
  const [editForm, setEditForm] = useState({
    email: "",
    password: "",
    creation_cost: 0,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      (window as any)._dev_inventory_trace = data;
    }
  }, [data]);

  const deleteMut = useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["inventory"] }),
    onError: (err: any) => alert(err.message),
  });

  const updateMut = useMutation({
    mutationFn: updateAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventory"] });
      setEditingId(null);
    },
    onError: (err: any) => alert(err.message),
  });

  const startEdit = (acc: BybitAccount) => {
    if (acc.is_sold) return;
    setEditingId(acc.id);
    setEditForm({
      email: acc.email,
      password: acc.password,
      creation_cost: acc.creation_cost,
    });
  };

  const handleSave = () => {
    if (!editingId) return;
    updateMut.mutate({
      id: editingId,
      updates: {
        email: editForm.email,
        password: editForm.password,
        creation_cost: editForm.creation_cost,
      },
    });
  };

  const handleDelete = (acc: BybitAccount) => {
    if (acc.is_sold) return;
    if (confirm("¿Eliminar este activo del inventario?")) {
      deleteMut.mutate(acc.id);
    }
  };

  const filteredData = useMemo(() => {
    return data.filter((acc) => {
      const matchesSearch = acc.email.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "todos" ? true : statusFilter === "vendidas" ? acc.is_sold : !acc.is_sold;
      const matchesDate = !dateFilter || acc.created_at.startsWith(dateFilter);
      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [data, search, statusFilter, dateFilter]);

  return (
    <div className="flex flex-col w-full">
      <div className="p-4 space-y-3 bg-white/[0.01] border-b border-white/5">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={14} />
          <input
            placeholder="Buscar por email..."
            className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 pl-9 pr-4 text-xs text-white outline-none focus:border-yellow-500/50"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-veridex-border-yellow-500/50" size={14} />
            <select
              className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 pl-9 pr-4 text-[10px] font-bold text-white/60 outline-none appearance-none"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
            >
              <option value="todos">Todos</option>
              <option value="disponibles">Disponibles</option>
              <option value="vendidas">Vendidas</option>
            </select>
          </div>

          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-veridex-border-yellow-500/50" size={14} />
            <input
              type="date"
              className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 pl-9 pr-3 text-[10px] font-bold text-white/60 outline-none"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 p-4">
        {filteredData.map((acc) => (
          <div key={acc.id} className="bg-[#111] border border-white/5 rounded-2xl p-5 space-y-4 relative">
            <div className="flex justify-between items-start">
              <div className="space-y-1 flex-1 mr-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck size={12} className="text-veridex-dark" />
                  <p className="text-[10px] font-black text-white/80 uppercase tracking-widest">Correo Bybit</p>
                </div>
                {editingId === acc.id ? (
                  <input
                    className="w-full bg-black border border-yellow-500/50 rounded-lg p-1 text-sm text-white outline-none"
                    value={editForm.email}
                    onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  />
                ) : (
                  <p className="text-sm font-bold text-white leading-tight truncate">{acc.email}</p>
                )}
              </div>

              <div className="flex flex-col items-end gap-2">
                <span
                  className={`px-2.5 py-1 rounded-md text-[9px] font-black uppercase border ${
                    !acc.is_sold ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-veridex/10 text-veridex border-veridex/20"
                  }`}
                >
                  {acc.is_sold ? "Vendida" : "Disponible"}
                </span>

                {!acc.is_sold && editingId !== acc.id && (
                  <button onClick={() => startEdit(acc)} className="p-2 bg-white/5 rounded-lg text-veridex border-yellow-500 transition-colors">
                    <Edit2 size={12} />
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
              <div>
                <p className="text-[9px] font-black text-white/80 uppercase mb-1 tracking-tighter">Contraseña</p>
                <div className="flex items-center gap-2">
                  {editingId === acc.id ? (
                    <input
                      className="w-full bg-black border border-yellow-500/50 rounded-lg p-1 text-xs text-white outline-none"
                      value={editForm.password}
                      onChange={(e) => setEditForm({ ...editForm, password: e.target.value })}
                    />
                  ) : (
                    <>
                      <span className="text-xs font-mono text-white/60">{showPass === acc.id ? acc.password : "••••••••"}</span>
                      <button onClick={() => setShowPass(showPass === acc.id ? null : acc.id)}>
                        {showPass === acc.id ? (
                          <EyeOff size={14} className="text-veridex-border-yellow-500" />
                        ) : (
                          <Eye size={14} className="text-white/20" />
                        )}
                      </button>
                    </>
                  )}
                </div>
              </div>
              <div className="text-right">
                <p className="text-[9px] font-black text-white/80 uppercase mb-1 tracking-tighter">Costo de creación</p>
                {editingId === acc.id ? (
                  <input
                    type="number"
                    className="w-16 bg-black border border-yellow-500/50 rounded-lg p-1 text-xs text-white text-right outline-none"
                    value={editForm.creation_cost}
                    onChange={(e) => setEditForm({ ...editForm, creation_cost: parseFloat(e.target.value) })}
                  />
                ) : (
                  <p className="text-sm font-black text-white">${acc.creation_cost.toFixed(2)}</p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex flex-col items-center gap-2 text-white/80">
                <div className="flex flex-row items-start gap-1">
                  <Calendar size={12} />
                  <span className="text-xs font-black text-white">Fecha de creación</span>
                </div>
                <span className="text-xs font-medium">
                  {new Date(acc.created_at).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}
                </span>
              </div>

              <div className="flex gap-2">
                {editingId === acc.id ? (
                  <>
                    <button onClick={() => setEditingId(null)} className="p-2 bg-red-500/10 text-red-500 rounded-xl">
                      <X size={14} />
                    </button>
                    <button onClick={handleSave} className="p-2 bg-veridex/10 text-veridex rounded-xl">
                      {updateMut.isPending ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
                    </button>
                  </>
                ) : (
                  !acc.is_sold && (
                    <button
                      onClick={() => handleDelete(acc)}
                      disabled={deleteMut.isPending}
                      className="p-2 text-red-500 bg-red-500/10 rounded-xl transition-all"
                    >
                      {deleteMut.isPending && deleteMut.variables === acc.id ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
