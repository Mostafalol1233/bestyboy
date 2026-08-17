export function getOriginalPrice(price: number): number {
  if (!Number.isFinite(price) || price <= 0) return 0;
  return Math.ceil((price * 1.25) / 5) * 5;
}

export function formatGameNumber(value: number, language: "ar" | "en"): string {
  return value.toLocaleString(language === "ar" ? "en-EG" : "en-EG");
}

export function formatMoney(value: number, language: "ar" | "en", currency = "EGP"): string {
  return `${formatGameNumber(value, language)} ${currency}`;
}
