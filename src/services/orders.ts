import { supabase } from "@/lib/supabase";
import { Order } from "@/types/order";

export const getOrders = async (): Promise<Order[]> => {
  const { data, error } = await supabase
    .from<"orders", Order>("orders")
    .select(
      `*, 
      bybit_accounts (email), 
      customers (email)`,
    )
    .order("created_at", { ascending: false });
  if (error) {
    throw new Error(error.message);
  }

  return data;
};
