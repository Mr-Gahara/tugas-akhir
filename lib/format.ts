export const formatPrice = (price?: number): string => {
  if (price == null || isNaN(price)) return "unset"; // or return "unset" if you prefer

  if (price < 0) {
    throw new Error("Price cannot be negative");
  }

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};
