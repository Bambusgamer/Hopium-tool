import generateCommaString from "transformers/commaString";

/**
 * Generates a price string from a price object
 * @param price price object
 * @returns price string
 */
export default function generatePriceString(price?: { currency: string, amount: number }): string {
    if (!price) return 'N/A';
    return `${generateCommaString(price.amount)} ${price.currency} `
}