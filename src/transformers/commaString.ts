/**
 * Transforms a float to a string with commas
 * @param num The number to transform
 * @returns The number as a string with commas
 */
export default function generateCommaString(num: number): string {
    return num.toString().replace('.', ',');
}