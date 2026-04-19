import { supabase } from "@/lib/supabase";
import { BybitAccount } from "@/types/account";

export const getInventory = async (): Promise<BybitAccount[]> => {
  const { data, error } = await supabase.from<"bybit_accounts", BybitAccount>("bybit_accounts").select("*");
  if (error) throw error;
  return data;
};

export const createInventoryAccount = async (account: Omit<BybitAccount, "id">) => {
  const { data, error } = await supabase.from("bybit_accounts").insert([account]).select();

  if (error) throw new Error(error.message);
  return data[0];
};

export const updateAccount = async ({ id, updates }: { id: string | number; updates: Partial<BybitAccount> }) => {
  const { data, error } = await supabase.from("bybit_accounts").update(updates).eq("id", id).select();

  if (error) {
    console.error("Error en updateAccount:", error.message);
    throw new Error("No se pudo actualizar la cuenta.");
  }

  return data[0];
};

export const deleteAccount = async (id: string | number) => {
  const { error } = await supabase.from("bybit_accounts").delete().eq("id", id);

  if (error) {
    console.error("Error en deleteAccount:", error.message);
    throw new Error("Error al intentar eliminar el registro.");
  }

  return true;
};
