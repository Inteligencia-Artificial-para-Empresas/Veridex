"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { LayoutPanelTop, LogOut, Plus, Loader2 } from "lucide-react";

// Supabase & Services
import { supabase } from "@/lib/supabase";
import { getInventory } from "@/services/inventories";
import { getOrders } from "@/services/orders";
import { getLatestTRM } from "@/services/trm";

// Types
import { AdminTab } from "@/types/admin";

// Components
import AddAccountModal from "@/components/sections/admin/AddAccountModal";
import PriceSelector from "@/components/sections/admin/PriceSelector";
import InventoryCards from "@/components/sections/admin/InventoryCards";
import InventoryTable from "@/components/sections/admin/InventoryTable";
import OrdersCards from "@/components/sections/admin/OrdersCards";
import OrdersTable from "@/components/sections/admin/OrdersTable";

export default function AdminPage() {
  // 1. ESTADOS (Hooks siempre al principio)
  const [activeTab, setActiveTab] = useState<AdminTab>("accounts");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // 2. EFECTOS
  useEffect(() => {
    setMounted(true);
  }, []);

  // 3. QUERIES (Hooks siempre antes de cualquier 'return' condicional)
  const { data: accounts = [], isLoading: loadingAcc } = useQuery({
    queryKey: ["inventory"],
    queryFn: getInventory,
  });

  const { data: orders = [], isLoading: loadingOrders } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  });

  const { data: trm = 4100, isLoading: loadingTRM } = useQuery({
    queryKey: ["trm-real"],
    queryFn: getLatestTRM,
    staleTime: 1000 * 60 * 60, // Cache de 1 hora
  });

  // 4. GUARDIA DE MONTAJE (Para evitar errores de hidratación y Hooks)
  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="animate-spin text-yellow-500" size={40} />
        <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.5em]">Iniciando Sistema...</span>
      </div>
    );
  }

  // 5. LÓGICA DE NEGOCIO (Después de asegurar que los hooks corrieron)
  const isLoading = loadingAcc || loadingOrders || loadingTRM;

  const totalValue = orders.reduce((acc, curr) => acc + curr.usd_value, 0);
  const totalExpenses = accounts.reduce((acc, curr) => acc + curr.creation_cost, 0);
  const netMargin = totalValue - totalExpenses;

  const stats = [
    {
      label: "TOTAL CUENTAS",
      value: accounts.length.toString(),
      cop: "",
      color: "text-yellow-500",
    },
    {
      label: "VALOR TOTAL VENTAS",
      value: `$${totalValue.toLocaleString()} USD`,
      cop: `$${(totalValue * trm).toLocaleString(undefined, { maximumFractionDigits: 0 })} COP`,
      color: "text-white",
    },
    {
      label: "GASTOS TOTALES",
      value: `$${totalExpenses.toLocaleString()} USD`,
      cop: `$${(totalExpenses * trm).toLocaleString(undefined, { maximumFractionDigits: 0 })} COP`,
      color: "text-white",
    },
    {
      label: "MARGEN NETO",
      value: `$${netMargin.toLocaleString()} USD`,
      cop: `$${(netMargin * trm).toLocaleString(undefined, { maximumFractionDigits: 0 })} COP`,
      color: "text-veridex",
      highlight: true,
    },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/admin/login";
  };

  return (
    <div className="min-h-screen bg-[#050505] px-4 md:px-6 lg:px-8 space-y-6 text-white w-full py-6">
      {/* HEADER */}
      <header className="flex flex-col lg:flex-row lg:items-center justify-between bg-[#111] p-4 rounded-2xl border border-white/5 gap-6">
        <div className="flex items-center justify-between w-full lg:w-auto">
          <div className="flex items-center gap-3">
            <span className="font-black text-2xl tracking-tighter italic">
              VERI<span className="text-veridex">DEX</span> <span className="text-yellow-500 text-sm not-italic ml-1 uppercase">CRM</span>
            </span>
          </div>

          <button onClick={handleLogout} className="lg:hidden p-2 rounded-lg bg-white/5 text-white/20 hover:text-red-500 transition-colors">
            <LogOut size={20} />
          </button>
        </div>

        {/* PRICE SELECTOR CON TRM DINÁMICA */}
        <div className="flex-1 max-w-2xl">
          <PriceSelector />
        </div>

        {/* LOGOUT DESKTOP */}
        <div className="hidden lg:flex items-center gap-6">
          <button onClick={handleLogout} className="cursor-pointer group flex items-center gap-3 text-white/20 hover:text-red-500 transition-all">
            <div className="flex flex-col items-end">
              <span className="text-xs font-bold">Salir</span>
            </div>
            <div className="p-2 rounded-lg bg-white/5 group-hover:bg-red-500/10 transition-colors border border-white/5">
              <LogOut size={16} />
            </div>
          </button>
        </div>
      </header>

      {/* STATS GRID */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {stats.map((stat, i) => (
          <div
            key={i}
            className={`p-4 md:p-6 rounded-2xl border transition-all duration-500 ${
              stat.highlight ? "border-yellow-500/50 bg-yellow-500/5 shadow-[0_0_50px_-12px_rgba(234,179,8,0.1)]" : "border-white/5 bg-[#111]"
            }`}
          >
            <p className="text-[9px] md:text-[10px] font-bold text-white/40 mb-1 md:mb-2 uppercase tracking-widest">{stat.label}</p>
            <h3 className={`text-lg md:text-xl lg:text-2xl font-black tracking-tight ${stat.color}`}>{stat.value}</h3>
            {stat.cop && <p className="text-[9px] text-veridex/60 font-bold mt-1 truncate">{stat.cop}</p>}
          </div>
        ))}
      </div>

      {/* TABS & ACTIONS */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
        <div className="flex bg-[#111] p-1 rounded-xl border border-white/5 w-full sm:w-auto shadow-inner">
          <button
            onClick={() => setActiveTab("accounts")}
            className={`cursor-pointer uppercase flex-1 sm:flex-none px-6 md:px-10 py-3 rounded-lg text-[10px] md:text-xs font-black transition-all duration-300 ${
              activeTab === "accounts" ? "bg-yellow-500 text-black shadow-lg shadow-yellow-500/20" : "text-white/40 hover:text-white"
            }`}
          >
            Inventario
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`cursor-pointer flex-1 sm:flex-none uppercase px-6 md:px-10 py-3 rounded-lg text-[10px] md:text-xs font-black transition-all duration-300 ${
              activeTab === "orders" ? "bg-yellow-500 text-black shadow-lg shadow-yellow-500/20" : "text-white/40 hover:text-white"
            }`}
          >
            Órdenes
          </button>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="w-full sm:w-auto bg-white text-black cursor-pointer uppercase hover:bg-yellow-500 p-3 px-8 rounded-xl font-black text-xs flex items-center justify-center gap-2 transition-all active:scale-95 group"
        >
          <Plus size={18} className="group-hover:rotate-90 transition-transform " />
          <span>Registrar Cuenta</span>
        </button>
      </div>

      {/* CONTENT AREA */}
      <div className="bg-[#111] border border-white/5 rounded-2xl shadow-2xl overflow-hidden min-h-[400px] relative">
        {isLoading ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm z-50">
            <Loader2 className="animate-spin text-yellow-500 mb-2" size={40} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-yellow-500/50">Sincronizando Terminal...</span>
          </div>
        ) : activeTab === "accounts" ? (
          <>
            <div className="hidden lg:block animate-in fade-in slide-in-from-bottom-2 duration-500">
              <InventoryTable data={accounts} />
            </div>
            <div className="lg:hidden">
              <InventoryCards data={accounts} />
            </div>
          </>
        ) : (
          <>
            <div className="hidden lg:block animate-in fade-in slide-in-from-bottom-2 duration-500">
              <OrdersTable data={orders} />
            </div>
            <div className="lg:hidden">
              <OrdersCards data={orders} />
            </div>
          </>
        )}
      </div>

      {/* MODALS */}
      <AddAccountModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}
