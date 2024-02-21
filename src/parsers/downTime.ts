import { type StationStatus, type ParsedStation, type DownTime, FuelType, StatusMessage } from 'types';
import approximateTimestamp from 'parsers/timestamp';
import trimString from 'parsers/trimString';

/**
 * seit 47 Minuten
 * seit 7 Stunden
 * seit mehr als 24 Stunden
 */
const downTimeRegex = /seit\s*(\d+)\s*(mehr\s*als)?\s*(Minuten|Stunden)/i;

/**
 * Parses a station status and returns a down time if the status is a down time.
 * @param status The status to parse
 * @param fuelType The fuel type of the status
 * @returns The parsed down time or null if the status is not a down time
 */
export default function parseDownTime(status: StationStatus, fuelType: FuelType): DownTime | null {
    if (!status.activity_message || typeof status.activity_message !== 'string') return null;

    if (status.combinedstatus !== StatusMessage.EXCEPTION) return null;

    const match = status.activity_message.match(downTimeRegex);

    if (!match) return null;

    const time = parseInt(match[1]);
    const unit = match[3];

    const start = approximateTimestamp(time, unit);

    if (!start) return null;

    const end = approximateTimestamp(0, 'Minuten');

    return {
        stationId: trimString(status.idx),
        fuelType,
        start: start.timestamp,
        startUnix: start.unix,
        end: end.timestamp,
        duration: Math.floor((end.unix - start.unix) / 1000 / 60),
        reason: trimString(status.combinedremark || '')
    };
}
