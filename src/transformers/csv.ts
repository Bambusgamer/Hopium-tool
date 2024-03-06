/**
 * Generate a CSV string from a 2D array of rows and columns
 * @param columns The columns of the CSV
 * @param rows The rows of the CSV
 * @returns A file in CSV format
 */
export default function generateCSV(columns: string[], rows: any[][]): string {
    let csv = '';

    csv += columns.join(',') + '\n';
    csv += rows.map(row => row.map(encodeRowItem).join(',')).join('\n');

    return csv;
}

/**
 * Encode a row item for CSV to allow for special characters and removes new lines
 * @param item The item to encode
 * @returns The encoded item
 */
function encodeRowItem(item: any): string {
    if (typeof item === 'string') {
        return `"${item.replace(/"/g, '""')}"`.replace(/(\r\n|\n|\r)/gm, "");
    }
    return item;
}