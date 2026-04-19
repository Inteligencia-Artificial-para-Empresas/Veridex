import { Customer } from "./customer";

export interface BybitAccount {
  id: string | number;
  email: string;
  password: string;
  creation_cost: number;
  created_at: string;
  is_sold: boolean;
}
