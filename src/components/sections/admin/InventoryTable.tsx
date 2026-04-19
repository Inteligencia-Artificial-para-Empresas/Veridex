"use client";

import { useState, useMemo } from "react";
import { BybitAccount } from "@/types/account";
import { Eye, EyeOff, ArrowUpDown, ChevronUp, ChevronDown, Search, Calendar, Filter, Trash2, Loader2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAccount, updateAccount } from "@/services/inventories";

interface InventoryTableProps {
  data: BybitAccount[];
}

type EditingCell = {
  id: string | number;
  field: keyof BybitAccount;
} | null;

export default function InventoryTable({ data }: InventoryTableProps) {
  const queryClient = useQueryClient();

  const [showPass, setShowPass] = useState<string | number | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"vendidas" | "disponibles" | "todos">("todos");
  const [dateFilter, setDateFilter] = useState("");
  const [sortConfig, setSortConfig] = useState<{ key: keyof BybitAccount; direction: "asc" | "desc" } | null>(null);

  const [editingCell, setEditingCell] = useState<EditingCell>(null);
  const [editValue, setEditValue] = useState("");

  const deleteMut = useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["inventory"] }),
    onError: (err: any) => alert(err.message),
  });

  const updateMut = useMutation({
    mutationFn: updateAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inventory"] });
      setEditingCell(null);
    },
    onError: (err: any) => alert(err.message),
  });

  const startEditing = (acc: BybitAccount, field: keyof BybitAccount) => {
    if (acc.is_sold) return;
    setEditingCell({ id: acc.id, field });
    setEditValue(String(acc[field]));
  };

  const handleUpdate = () => {
    if (!editingCell) return;
    const finalValue = editingCell.field === "creation_cost" ? parseFloat(editValue) : editValue;

    updateMut.mutate({
      id: editingCell.id,
      updates: { [editingCell.field]: finalValue },
    });
  };

  const handleDelete = (acc: BybitAccount) => {
    if (acc.is_sold) return;
    if (confirm(`¿Eliminar definitivamente la cuenta ${acc.email}?`)) {
      deleteMut.mutate(acc.id);
    }
  };

  const handleSort = (key: keyof BybitAccount) => {
    if (key === "password") return;
    let direction: "asc" | "desc" = "asc";
    if (sortConfig?.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const processedData = useMemo(() => {
    let filtered = data.filter((item) => {
      const matchesSearch = item.email.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "todos" ? true : statusFilter === "vendidas" ? item.is_sold : !item.is_sold;
      const matchesDate = !dateFilter || item.created_at.startsWith(dateFilter);
      return matchesSearch && matchesStatus && matchesDate;
    });

    if (sortConfig) {
      filtered.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];
        if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return filtered;
  }, [data, search, statusFilter, dateFilter, sortConfig]);

  return (
    <div className="flex flex-col w-full">
      <div className="p-4 border-b border-white/5 flex flex-wrap gap-4 bg-white/[0.01]">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={14} />
          <input
            placeholder="Filtrar por correo..."
            className="w-full bg-black/40 border border-white/10 rounded-xl py-2 pl-9 pr-4 text-xs text-white outline-none focus:border-yellow-500/50 transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-500/50" size={14} />
          <select
            className="bg-black/40 border border-white/10 rounded-xl py-2 pl-9 pr-8 text-xs text-white/60 outline-none cursor-pointer appearance-none"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
          >
            <option value="todos">Todos los Estados</option>
            <option value="disponibles">Disponibles</option>
            <option value="vendidas">Vendidas</option>
          </select>
        </div>

        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-500/50" size={14} />
          <input
            type="date"
            className="bg-black/40 border border-white/10 rounded-xl py-2 pl-9 pr-3 text-xs text-white/60 outline-none"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[1000px]">
          <thead>
            <tr className="border-b border-white/5 bg-white/[0.02]">
              {[
                { label: "Correo de la cuenta", key: "email" },
                { label: "Contraseña", key: "password" },
                { label: "Costo (USD)", key: "creation_cost" },
                { label: "Estado", key: "is_sold" },
                { label: "Fecha de creación", key: "created_at" },
              ].map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key as keyof BybitAccount)}
                  className={`p-5 text-[10px] font-black uppercase tracking-[0.2em] text-white/40 ${col.key !== "password" ? "cursor-pointer hover:text-white" : ""}`}
                >
                  <div className="flex items-center gap-2">
                    {col.label}
                    {col.key !== "password" &&
                      sortConfig?.key === col.key &&
                      (sortConfig.direction === "asc" ? <ChevronUp size={12} /> : <ChevronDown size={12} />)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {processedData.map((acc) => (
              <tr key={acc.id} className="hover:bg-white/[0.02] transition-all group relative">
                <td className="p-5" onDoubleClick={() => startEditing(acc, "email")}>
                  {editingCell?.id === acc.id && editingCell.field === "email" ? (
                    <input
                      autoFocus
                      className="bg-black border border-yellow-500 text-xs p-1 rounded outline-none w-full"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onBlur={handleUpdate}
                      onKeyDown={(e) => e.key === "Enter" && handleUpdate()}
                    />
                  ) : (
                    <span
                      className={`text-sm font-bold truncate block max-w-[220px] ${acc.is_sold ? "text-white/50" : "text-white/80 group-hover:text-white cursor-pointer"}`}
                    >
                      {acc.email}
                    </span>
                  )}
                </td>

                <td className="p-5" onDoubleClick={() => startEditing(acc, "password")}>
                  <div className="flex items-center justify-between gap-4 max-w-[180px] cursor-pointer">
                    {editingCell?.id === acc.id && editingCell.field === "password" ? (
                      <input
                        autoFocus
                        className="bg-black border border-yellow-500 text-xs p-1 rounded outline-none w-full"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onBlur={handleUpdate}
                        onKeyDown={(e) => e.key === "Enter" && handleUpdate()}
                      />
                    ) : (
                      <>
                        <span className={`text-sm font-mono tracking-wider truncate flex-1 ${acc.is_sold ? "text-white/50" : "text-white/40"}`}>
                          {showPass === acc.id ? acc.password : "••••••••"}
                        </span>
                        <button
                          onClick={() => setShowPass(showPass === acc.id ? null : acc.id)}
                          className="text-white/10 hover:text-yellow-500 transition-colors shrink-0 cursor-pointer"
                        >
                          {showPass === acc.id ? <EyeOff size={14} /> : <Eye size={14} />}
                        </button>
                      </>
                    )}
                  </div>
                </td>

                <td className="p-5 cursor-pointer" onDoubleClick={() => startEditing(acc, "creation_cost")}>
                  {editingCell?.id === acc.id && editingCell.field === "creation_cost" ? (
                    <input
                      autoFocus
                      type="number"
                      className="bg-black border border-yellow-500 text-xs p-1 rounded outline-none w-20"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      onBlur={handleUpdate}
                      onKeyDown={(e) => e.key === "Enter" && handleUpdate()}
                    />
                  ) : (
                    <span className={`text-sm font-black ${acc.is_sold ? "text-white/50" : "text-white"}`}>${acc.creation_cost.toFixed(2)}</span>
                  )}
                </td>

                <td className="p-5">
                  <span
                    className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-tighter border ${
                      acc.is_sold
                        ? "bg-veridex/10 text-veridex border-veridex/20"
                        : "bg-emerald-500/10 text-emerald-500 border-emerald-500/20 shadow-[0_0_15px_-5px_rgba(16,185,129,0.3)]"
                    }`}
                  >
                    {acc.is_sold ? "Vendida" : "Disponible"}
                  </span>
                </td>

                <td className="p-5 relative">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs italic font-extrabold ${acc.is_sold ? "text-white/50" : "text-white"}`}>
                      {new Date(acc.created_at).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}
                    </span>

                    {!acc.is_sold && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(acc);
                        }}
                        className="cursor-pointer opacity-0 group-hover:opacity-100 transition-all duration-200 p-2 hover:bg-red-500/20 text-white/50 hover:text-red-500 rounded-xl ml-2 shrink-0"
                      >
                        {deleteMut.isPending && deleteMut.variables === acc.id ? (
                          <Loader2 size={14} className="animate-spin" />
                        ) : (
                          <Trash2 size={14} />
                        )}
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {processedData.length === 0 && (
        <div className="p-20 text-center border-t border-white/5">
          <p className="text-white/10 text-[10px] font-black uppercase tracking-[0.4em] italic">Sin resultados</p>
        </div>
      )}
    </div>
  );
}
