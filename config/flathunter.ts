export const siteConfig = {
  name: "FlatHunter",
  tagline: "We search Chennai rentals for you",
  company: "Bluesquare Technologies",
  location: "Rasipuram, Tamil Nadu",
  whatsapp: "https://wa.me/919025410474",
  phoneDisplay: "+91 90254 10474",
  phoneTel: "tel:+919025410474",
  email: "gautham@bluesquaregroup.in",
} as const;

/** Builds a wa.me link with a prefilled, URL-encoded message. */
export function getWhatsappLink(message: string): string {
  return `${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const mailtoLink = `mailto:${siteConfig.email}`;

// Chennai map defaults
export const CHENNAI_CENTER: [number, number] = [13.0827, 80.2707];
export const DEFAULT_ZOOM = 12;
export const DEFAULT_RADIUS_KM = 3;
export const MIN_RADIUS_KM = 1;
export const MAX_RADIUS_KM = 10;

export const BUDGET_MIN = 5000;
export const BUDGET_MAX = 60000;
export const BUDGET_STEP = 1000;
export const DEFAULT_BUDGET_MIN = 12000;
export const DEFAULT_BUDGET_MAX = 20000;

export const HOME_TYPES = [
  "1RK",
  "1BHK",
  "2BHK",
  "3BHK",
  "Independent house",
  "Any",
] as const;

export const OCCUPANT_TYPES = [
  { value: "bachelor_male", label: "Bachelor (male)" },
  { value: "bachelor_female", label: "Bachelor (female)" },
  { value: "family", label: "Family" },
  { value: "couple", label: "Couple" },
] as const;

export const PLANS = [
  {
    id: "3day",
    label: "3 Days",
    price: 299,
    days: 3,
    description: "Try it out. Fresh matches daily for 3 days.",
    badge: null as string | null,
  },
  {
    id: "2week",
    label: "2 Weeks",
    price: 999,
    days: 14,
    description: "Most people find a house in this window.",
    badge: "Most popular",
  },
  {
    id: "1month",
    label: "1 Month",
    price: 1499,
    days: 30,
    description: "For long or tricky searches. Daily matches for 30 days.",
    badge: null as string | null,
  },
] as const;

export const PLAN_FEATURES = [
  "We do the searching for you",
  "Matches on WhatsApp daily",
  "First matches within 24 hours",
  "Full refund if we don't deliver",
];

export const VERIFICATION_ADDON = {
  id: "phone_verification",
  label: "Phone verification",
  price: 2000,
  description:
    "We call the owners for you and confirm the house is still available, the rent, and whether they accept bachelors/family before sending it.",
};

export type PlanId = (typeof PLANS)[number]["id"];
