"use client";

import { useState, useMemo } from "react";
import { Order } from "@/types/order";
import { User, CreditCard, Calendar, Hash, Search, Filter } from "lucide-react";

interface OrdersCardsProps {
  data: Order[];
}

export default function OrdersCards({ data }: OrdersCardsProps) {
  // --- ESTADOS DE FILTRO ---
  const [search, setSearch] = useState("");
  const [cryptoFilter, setCryptoFilter] = useState("Todas");
  const [dateFilter, setDateFilter] = useState("");

  // --- LÓGICA DE FILTRADO ---
  const processedData = useMemo(() => {
    return data.filter((order) => {
      const matchesSearch =
        order.customers.email.toLowerCase().includes(search.toLowerCase()) ||
        order.bybit_accounts?.email.toLowerCase().includes(search.toLowerCase());

      const matchesCrypto = cryptoFilter === "Todas" || order.currency === cryptoFilter;

      const matchesDate = !dateFilter || order.created_at.startsWith(dateFilter);

      return matchesSearch && matchesCrypto && matchesDate;
    });
  }, [data, search, cryptoFilter, dateFilter]);

  return (
    <div className="flex flex-col w-full">
      {/* BARRA DE FILTROS (Optimizada para móvil) */}
      <div className="p-4 space-y-3 bg-white/[0.01] border-b border-white/5">
        {/* Búsqueda */}
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={14} />
          <input
            placeholder="Buscar comprador o cuenta..."
            className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 pl-9 pr-4 text-xs text-white outline-none focus:border-yellow-500/50 transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          {/* Selector de Cripto */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-500/50" size={14} />
            <select
              className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 pl-9 pr-4 text-[10px] font-bold text-white/60 outline-none appearance-none focus:border-yellow-500/50"
              value={cryptoFilter}
              onChange={(e) => setCryptoFilter(e.target.value)}
            >
              <option value="Todas">Todas</option>
              <option value="USDT">USDT</option>
              <option value="BTC">BTC</option>
              <option value="ETH">ETH</option>
            </select>
          </div>

          {/* Selector de Fecha */}
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-500/50" size={14} />
            <input
              type="date"
              className="w-full bg-black/40 border border-white/10 rounded-xl py-2.5 pl-9 pr-3 text-[10px] font-bold text-white/60 outline-none focus:border-yellow-500/50"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* LISTADO DE TARJETAS */}
      <div className="grid grid-cols-1 gap-4 p-4">
        {processedData.map((order) => (
          <div key={order.id} className="bg-[#111] border border-white/5 rounded-2xl p-5 space-y-4 hover:border-white/10 transition-colors shadow-sm">
            {/* Header: Valor USD y Fecha */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="flex items-baseline gap-1">
                  <span className="text-lg font-black text-veridex">${order.usd_value.toFixed(2)}</span>
                  <span className="text-[10px] font-bold text-white/20 uppercase tracking-tighter">USD</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-white/20">
                <Calendar size={12} />
                <span className="text-[10px] font-mono italic">{new Date(order.created_at).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-white/5 rounded-xl border border-white/5">
                  <User size={14} className="text-yellow-500/70" />
                </div>
                <div>
                  <p className="text-[9px] font-black text-white/20 uppercase tracking-widest">Usuario</p>
                  <p className="text-xs font-bold text-white/80 leading-tight truncate max-w-[200px]">{order.customers.email.toLocaleLowerCase()}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 bg-white/5 rounded-xl border border-white/5">
                  <CreditCard size={14} className="text-white/40" />
                </div>
                <div>
                  <p className="text-[9px] font-black text-white/20 uppercase tracking-widest">Importe Recibido</p>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-sm font-black text-white">{order.amount}</span>
                    <span className="text-[10px] font-bold text-yellow-500 uppercase tracking-tighter">{order.currency}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer: Cuenta Entregada */}
            <div className="pt-4 border-t border-white/5 flex flex-col gap-1">
              <div className="flex items-center gap-1.5 mb-1">
                <Hash size={10} className="text-white/20" />
                <p className="text-[9px] font-black text-white/20 uppercase tracking-widest">Bybit Entregada</p>
              </div>
              <div className="bg-black/40 rounded-lg p-2.5 border border-white/5">
                <p className="text-[11px] font-medium text-white/40 truncate italic">{order.bybit_accounts?.email || "Sin asignar"}</p>
              </div>
            </div>
          </div>
        ))}

        {processedData.length === 0 && (
          <div className="py-20 text-center flex flex-col items-center justify-center border border-dashed border-white/5 rounded-3xl">
            <Search size={24} className="text-white/5 mb-2" />
            <p className="text-[10px] font-black text-white/10 uppercase tracking-[0.3em]">Sin coincidencias encontradas</p>
          </div>
        )}
      </div>
    </div>
  );
}
