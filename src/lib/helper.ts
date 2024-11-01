export const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export const formatToIDR = (amount: number): string => {
  return new Intl.NumberFormat("id-ID", {
    currency: "IDR",
    currencyDisplay: "symbol",
    currencySign: "standard",
    style: "currency",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const formatDate = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return date.toLocaleDateString("en-GB", options);
};
