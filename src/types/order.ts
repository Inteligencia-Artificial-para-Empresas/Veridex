import { BybitAccount } from "./account";
import { Customer } from "./customer";

export interface Order {
  id: string | number;
  amount: number;
  currency: string;
  user_email: string;
  usd_value: number;
  created_at: string;
  customers: Customer;
  bybit_accounts: BybitAccount;
}
