import { type FuelingEvent, FuelType } from 'types';
import generateCSV from 'transformers/csv';
import generatePriceString from 'transformers/price';
import generateCommaString from 'transformers/commaString';

/**
 * Generates a CSV string from an array of fueling events
 * @param fuelingEvents array of fueling events
 * @returns CSV string
 */
export default function generateFuelingEventsCSV(fuelingEvents: FuelingEvent[]): string {
    return generateCSV(
        ['stationId', 'fuelType', 'timestamp', 'amount (kg)', 'combined price', 'price', 'currency'],
        fuelingEvents.map(event => [
            event.stationId,
            event.fuelType,
            event.timestamp,
            generateCommaString(event.amount),
            generatePriceString(event.price),
            generateCommaString(event.price.amount),
            event.price.currency
        ])
    )
}
