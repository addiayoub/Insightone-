export function formatNumberWithSpaces(number) {
  const numberFormatter = Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const formatted = numberFormatter.format(number);
  return formatted.replace(/,/g, " ");
}
