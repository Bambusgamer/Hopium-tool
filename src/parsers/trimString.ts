/**
 * Trims a optional string and returns a string or 'N/A' if the input is null or empty
 * @param str The string to trim
 * @returns The trimmed string or 'N/A' if the input is null or empty
 */
export default function trimString(str: string | null): string {
    return (str || 'N/A').trim().replace(/(\r\n|\n|\r)/gm, "");
}
