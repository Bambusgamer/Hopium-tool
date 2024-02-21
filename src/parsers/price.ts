// capture the currency and number: EUR 14,05 / kg
const priceRegex = /(\w+)\s*(\d+(?:[.,]\d+)?)/i;

/**
 * Parses the price string into a currency and amount
 * @param price The price string to parse
 * @returns The parsed currency and amount or null if the price string is invalid
 */
export default function parsePrice(price: string | null): { currency: string, amount: number } | null {
    if (!price) return null;

    const match = price.match(priceRegex);

    if (!match) return null;

    return {
        currency: match[1],
        amount: parseFloat(match[2].replace(',', '.'))
    }
}
