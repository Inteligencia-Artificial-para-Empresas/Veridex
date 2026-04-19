"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown, RefreshCw, Coins, Search } from "lucide-react";
import { getTopSymbols } from "@/services/binance";

export default function PriceSelector() {
  const [selectedId, setSelectedId] = useState("BTC");
  const trmFallback = 4150;

  // 1. Traemos los símbolos disponibles
  const { data: symbols = [] } = useQuery({
    queryKey: ["binance-symbols"],
    queryFn: getTopSymbols,
    staleTime: Infinity, // La lista de símbolos no cambia seguido
  });

  const selected = symbols.find((s: any) => s.id === selectedId) || symbols[0];

  // 2. Traemos los precios del símbolo seleccionado
  const {
    data: prices,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["header-prices", selected?.symbol],
    queryFn: async () => {
      if (!selected) return [];
      const symbolsQuery = `["${selected.symbol}","${selected.pairUsdc}"]`;
      const res = await fetch(`https://api.binance.com/api/v3/ticker/price?symbols=${symbolsQuery}`);
      return res.json();
    },
    enabled: !!selected,
    refetchInterval: 15000,
  });

  const getPrice = (sym: string) => parseFloat(prices?.find((p: any) => p.symbol === sym)?.price || "0");

  const priceUSD = getPrice(selected?.symbol || "");
  const priceUSDC = getPrice(selected?.pairUsdc || "");
  const priceCOP = priceUSD * trmFallback;

  return (
    <div className="bg-black/20 backdrop-blur-md border border-white/5 rounded-2xl p-3 md:p-1.5 flex flex-col md:flex-row items-center gap-4 md:gap-2 w-full shadow-inner">
      {/* Selector de Moneda: Full width en móvil, ancho fijo en desktop */}
      <div className="relative group w-full md:min-w-[120px] md:w-auto">
        <select
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
          className="w-full appearance-none bg-veridex-dark text-black text-[11px] font-black pl-8 pr-8 py-2.5 rounded-xl cursor-pointer hover:bg-amber-200 transition-all outline-none uppercase tracking-tighter"
        >
          {symbols.map((s: any) => (
            <option key={s.id} value={s.id}>
              {s.id}
            </option>
          ))}
        </select>
        <Coins size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-black/50" />
        <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-black/30" />
      </div>

      {/* Contenedor de Valores: Columna en móvil, Fila en desktop */}
      <div className="flex flex-col sm:flex-row flex-1 w-full items-center justify-between px-2 md:px-4 gap-3 sm:gap-0">
        {/* Market USD */}
        <div className="flex flex-row sm:flex-col justify-between sm:justify-start w-full sm:w-auto border-b border-white/5 sm:border-none pb-2 sm:pb-0">
          <span className="text-[7px] md:text-[8px] font-black text-white/20 uppercase tracking-[0.2em] self-center sm:self-start">Market USD</span>
          <span className="text-xs md:text-sm font-mono font-bold text-white">
            {isLoading ? "---" : `$${priceUSD.toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
          </span>
        </div>

        {/* Estimado COP */}
        <div className="flex flex-row sm:flex-col justify-between sm:justify-start w-full sm:w-auto border-b border-white/5 sm:border-none pb-2 sm:pb-0">
          <span className="text-[7px] md:text-[8px] font-black text-white/20 uppercase tracking-[0.2em] self-center sm:self-start">Estimado COP</span>
          <span className="text-xs md:text-sm font-mono font-bold text-veridex">
            {isLoading ? "---" : `$${Math.round(priceCOP).toLocaleString()}`}
          </span>
        </div>

        {/* Par USDC */}
        <div className="flex flex-row sm:flex-col justify-between sm:justify-start w-full sm:w-auto">
          <span className="text-[7px] md:text-[8px] font-black text-white/20 uppercase tracking-[0.2em] self-center sm:self-start">Par USDC</span>
          <span className="text-xs md:text-sm font-mono font-bold text-blue-400">
            {isLoading ? "---" : priceUSDC > 0 ? priceUSDC.toLocaleString() : "N/A"}
          </span>
        </div>
      </div>

      {/* Status de Sincronización: Posición absoluta o discreta en móvil */}
      <div className="flex items-center self-end md:self-center px-2">
        <div className={`h-1.5 w-1.5 rounded-full ${isFetching ? "bg-yellow-500 animate-pulse" : "bg-white/10"}`} />
      </div>
    </div>
  );
}
