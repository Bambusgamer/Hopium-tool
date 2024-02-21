import type { Station, ParsedStation } from 'types';
import { FuelType } from 'types';
import parsePrice from 'parsers/price';
import trimString from 'parsers/trimString';

/**
 * Parses a station entry from the h2.live API
 * @param station station entry from the h2.live API
 * @returns parsed station entry
 */
export default function parseStation(station: Station, fuelType: FuelType): ParsedStation {
    const price = parsePrice(station.price_message);

    const parsedStation: ParsedStation = {
        id: trimString(station.idx),
        name: trimString(station.name),
        operator: trimString(station.operatorname),
        location: {
            postalCode: parseInt(station.zip || '') || 0,
            city: trimString(station.city),
            country: trimString(station.countryshortname),
            longitude: Number(station.longitude) || 0,
            latitude: Number(station.latitude) || 0,
            street: trimString(station.street),
            streetNumber: trimString(station.streetnr)
        },
        fuelTypes: [fuelType],
        prices: {},
        planning: {
            [fuelType]: 'complete'
        }
    };

    if (price) {
        parsedStation.prices[fuelType] = price;
    }

    return parsedStation;
}