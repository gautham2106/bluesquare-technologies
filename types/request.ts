import type { PlanId } from "@/config/flathunter";

export type OccupantType =
  | "bachelor_male"
  | "bachelor_female"
  | "family"
  | "couple";

export type HomeType = "1RK" | "1BHK" | "2BHK" | "3BHK" | "Independent house" | "Any";

export interface LocationState {
  lat: number;
  lng: number;
  radiusKm: number;
  areaName: string;
}

export interface RequirementFormData {
  location: LocationState;
  homeType: HomeType | null;
  budgetMin: number;
  budgetMax: number;
  furnished: boolean;
  occupantType: OccupantType | null;
  name: string;
  whatsapp: string;
  moveInDate: string;
  notes: string;
}

export interface RequestRow {
  id?: string;
  lat: number;
  lng: number;
  radius_km: number;
  area_name: string;
  home_type: string;
  budget_min: number;
  budget_max: number;
  furnished: boolean;
  occupant_type: string;
  name: string;
  whatsapp: string;
  move_in_date: string;
  notes: string | null;
  status: "pending_payment" | "paid" | "cancelled";
  utm_source: string | null;
  utm_campaign: string | null;
  plan?: PlanId | null;
  addon_verification?: boolean;
  amount?: number | null;
  razorpay_order_id?: string | null;
  razorpay_payment_id?: string | null;
  created_at?: string;
}
