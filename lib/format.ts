export const formatPrice = (price: number): string => {
  if (price < 0) {
    throw new Error("Price cannot be negative");
  }
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}