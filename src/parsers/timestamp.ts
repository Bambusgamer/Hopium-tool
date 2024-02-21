/**
 * Creates a approximate timestamp based on the given time and unit
 * @param time The time
 * @param unit The unit
 * @returns The approximate timestamp
 */
export default function approximateTimestamp(time: number, unit: string): { timestamp: string, unix: number } {
    const now = new Date();

    let timestamp = new Date(now);

    switch (unit) {
        case 'Minuten':
            timestamp.setMinutes(now.getMinutes() - time);
            break;
        case 'Stunden':
            timestamp.setHours(now.getHours() - time);
            break;
        default:
            throw new Error('Invalid unit');
    }

    timestamp.setSeconds(0);
    timestamp.setMilliseconds(0);

    return {
        timestamp: timestamp.toLocaleString('de-DE', {
            timeZone: 'Europe/Berlin'
        }),
        unix: timestamp.getTime()
    }
}