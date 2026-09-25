export const siteConfig = {
  name: "Bluesquare Technologies",
  shortName: "Bluesquare",
  location: "Rasipuram, Namakkal, Tamil Nadu",
  phoneDisplay: "+91 90254 10474",
  phoneTel: "tel:+919025410474",
  whatsapp: "https://wa.me/919025410474",
  email: "gautham@bluesquaregroup.in",
} as const;

/**
 * Builds a wa.me link with a prefilled, URL-encoded message.
 * Falls back to a generic "a project" topic when no specific problem is given.
 */
export function getWhatsappLink(topic?: string): string {
  const message = `Hi Bluesquare, I'd like to talk about: ${topic ?? "a project"}`;
  return `${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const mailtoLink = `mailto:${siteConfig.email}`;
