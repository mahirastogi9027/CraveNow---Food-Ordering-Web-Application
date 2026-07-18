const INR_FORMATTER = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  currencyDisplay: 'narrowSymbol',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export function formatINR(amount) {
  return INR_FORMATTER.format(Number(amount) || 0);
}
