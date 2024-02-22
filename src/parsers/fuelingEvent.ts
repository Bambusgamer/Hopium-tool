import { type StationStatus, type ParsedStation, type FuelingEvent, FuelType } from 'utils/types';
import approximateTimestamp from 'parsers/timestamp';
import trimString from 'parsers/trimString';

/**
 * Letzte Betankung an dieser Station:\n10,55 kg vor 42 Minuten
 * Letzte Betankung an dieser Station:\n6.94 kg vor 7 Stunden
 * Letzte Betankung an dieser Station:\n12,06 kg vor mehr als 24 Stunden
 */
const fuelingEventRegex = /(\d+(?:[.,]\d+)?)\s*kg\s*vor\s*(mehr\s*als)?\s*?(\d+)\s*(Minuten|Stunden)/i;

/**
 * Parses a station status and returns a fueling event if the status is a fueling event.
 * @param status The status to parse
 * @param station The station to which the status belongs
 * @returns The parsed fueling event or null if the status is not a fueling event
 */
export default function parseFuelingEvent(status: StationStatus, fuelType: FuelType, station?: ParsedStation): FuelingEvent | null {
    if (!status.activity_message || typeof status.activity_message !== 'string') return null;

    const match = status.activity_message.match(fuelingEventRegex);

    if (!match) return null;

    const amount = parseFloat(match[1].replace(',', '.'));
    const time = parseInt(match[3]);
    const unit = match[4];

    const timestamp = approximateTimestamp(time, unit);

    if (!timestamp) return null;

    let price = {
        currency: 'N/A',
        amount: 0
    };

    if (station && station.prices[fuelType] !== undefined) {
        price = station.prices[fuelType]!;
    }

    return {
        stationId: trimString(status.idx),
        fuelType: fuelType,
        amount,
        price,
        timestamp: timestamp.timestamp,
        unix: timestamp.unix
    }
}
