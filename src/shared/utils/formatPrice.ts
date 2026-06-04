function formatPrice(value: string | number | undefined, locale = "es-AR") {
  if (typeof value === "string") {
    value = parseFloat(value);
  }
  if (value === undefined || isNaN(value)) {
    value = 0;
  }
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
}

function formatPriceWithNoDecimals(value: string | number | undefined, locale = "es-AR") {
  if (typeof value === "string") {
    value = parseFloat(value);
  }
  if (value === undefined || isNaN(value)) {
    value = 0;
  }
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

export default formatPrice;
export {formatPriceWithNoDecimals};
