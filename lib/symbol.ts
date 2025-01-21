const currencySymbols: { [key: string]: string } = {
    USD: "$",
    EUR: "€",
    GBP: "£",
    JPY: "¥",
    CNY: "¥",
    INR: "₹",
    AUD: "A$",
    CAD: "C$",
    CHF: "Fr",
    SGD: "$",
    // Add more currencies as needed
  };
  
  /**
   * Get the currency symbol for a given currency code.
   * @param currency The currency code (e.g., "USD", "EUR")
   * @returns The currency symbol or the original currency code if not found
   */
  export function getCurrencySymbol(currency: string): string {
    return currencySymbols[currency.toUpperCase()] || currency;
  }