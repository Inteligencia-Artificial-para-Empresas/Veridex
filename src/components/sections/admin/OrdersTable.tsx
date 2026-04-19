"use client";

import { useState, useMemo } from "react";
import { Order } from "@/types/order";
import { ArrowUpDown, ChevronUp, ChevronDown, Search, Filter, Calendar } from "lucide-react";

interface OrdersTableProps {
  data: Order[];
}

export default function OrdersTable({ data }: OrdersTableProps) {
  const [search, setSearch] = useState("");
  const [cryptoFilter, setCryptoFilter] = useState("Todas");
  const [dateFilter, setDateFilter] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Order;
    direction: "asc" | "desc";
  } | null>(null);

  const processedData = useMemo(() => {
    let filtered = data.filter((item) => {
      const matchesSearch =
        item.customers.email.toLowerCase().includes(search.toLowerCase()) || item.bybit_accounts.email.toLowerCase().includes(search.toLowerCase());
      const matchesCrypto = cryptoFilter === "Todas" || item.currency === cryptoFilter;
      const matchesDate = !dateFilter || item.created_at.startsWith(dateFilter);

      return matchesSearch && matchesCrypto && matchesDate;
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
  }, [data, search, cryptoFilter, dateFilter, sortConfig]);

  const handleSort = (key: keyof Order) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig?.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="flex flex-col w-full">
      <div className="p-4 border-b border-white/5 flex flex-wrap gap-4 bg-white/[0.01]">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" size={14} />
          <input
            placeholder="Buscar por usuario o cuenta..."
            className="w-full bg-black/40 border border-white/10 rounded-lg py-2 pl-9 pr-4 text-xs text-white outline-none focus:border-yellow-500/50 transition-all"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-500/50" size={14} />
          <select
            className="bg-black/40 border border-white/10 rounded-lg py-2 pl-9 pr-8 text-xs text-white/60 outline-none cursor-pointer appearance-none focus:border-yellow-500/50"
            value={cryptoFilter}
            onChange={(e) => setCryptoFilter(e.target.value)}
          >
            <option value="Todas">Todas las Criptos</option>
            <option value="BTC">BTC</option>
            <option value="USDT">USDT</option>
            <option value="USDC">USDC</option>
          </select>
        </div>

        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-yellow-500/50" size={14} />
          <input
            type="date"
            className="bg-black/40 border border-white/10 rounded-lg py-2 pl-9 pr-3 text-xs text-white/60 outline-none focus:border-yellow-500/50"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="border-b border-white/5 bg-white/[0.02]">
              {[
                { label: "Usuario", key: "user_email" },
                { label: "Bybit Asignada", key: "account_email" },
                { label: "Importe de Pago", key: "amount" },
                { label: "Valor USD", key: "usd_value" },
                { label: "Fecha Compra", key: "created_at" },
              ].map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key as keyof Order)}
                  className="p-5 text-[10px] font-black uppercase tracking-[0.2em] text-white/40 cursor-pointer hover:text-white transition-colors"
                >
                  <div className="flex items-center gap-2">
                    {col.label}
                    {sortConfig?.key === col.key ? (
                      sortConfig.direction === "asc" ? (
                        <ChevronUp size={12} className="text-yellow-500" />
                      ) : (
                        <ChevronDown size={12} className="text-yellow-500" />
                      )
                    ) : (
                      <ArrowUpDown size={12} className="opacity-10" />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {processedData.map((order) => (
              <tr key={order.id} className="hover:bg-white/[0.01] transition-all group">
                <td className="p-5">
                  <span className="text-sm font-extrabold text-white group-hover:text-white">{order.customers.email}</span>
                </td>
                <td className="p-5 text-sm font-semibold text-white/90">{order.bybit_accounts.email}</td>
                <td className="p-5">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-sm font-black text-white">{order.amount}</span>
                    <span className="text-xs font-bold text-yellow-500 uppercase">{order.currency}</span>
                  </div>
                </td>
                <td className="p-5">
                  <span className="text-sm font-black text-veridex px-2 py-1 rounded border border-veridex/30">${order.usd_value.toFixed(2)}</span>
                </td>
                <td className="text-xs font-extrabold">{new Date(order.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {processedData.length === 0 && (
        <div className="p-20 text-center border-t border-white/5">
          <p className="text-white/20 text-xs font-bold uppercase tracking-widest italic">No se encontraron registros de ventas.</p>
        </div>
      )}
    </div>
  );
}
