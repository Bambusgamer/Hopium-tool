import { type ParsedStation, FuelType } from 'types';
import generateCSV from 'transformers/csv';
import generatePriceString from 'transformers/price';
import generateCommaString from 'transformers/commaString';

/**
 * Generates a CSV string from an array of stations
 * @param stations array of stations
 * @returns CSV string
 */
export default function generateStationsCSV(stations: ParsedStation[]): string {
    return generateCSV(
        ['id', 'name', 'operator', 'country', 'city', 'postalCode', 'street', 'streetNumber', 'longitude', 'latitude', 'hasP700', 'hasP350', 'hasP350Large', 'P700Price', 'P350Price', 'P350LargePrice', 'P700PlanningProgress', 'P350PlanningProgress', 'P350LargePlanningProgress'],
        stations.map(station => [
            station.id,
            station.name,
            station.operator,
            station.location.country,
            station.location.city,
            station.location.postalCode,
            station.location.street,
            station.location.streetNumber,
            generateCommaString(station.location.longitude),
            generateCommaString(station.location.latitude),
            station.fuelTypes.includes(FuelType.P700_SMALL),
            station.fuelTypes.includes(FuelType.P350_SMALL),
            station.fuelTypes.includes(FuelType.P350_LARGE),
            generatePriceString(station.prices[FuelType.P700_SMALL]),
            generatePriceString(station.prices[FuelType.P350_SMALL]),
            generatePriceString(station.prices[FuelType.P350_LARGE]),
            generatePlanningProgress(station, FuelType.P700_SMALL),
            generatePlanningProgress(station, FuelType.P350_SMALL),
            generatePlanningProgress(station, FuelType.P350_LARGE)
        ])
    )
}

/**
 * Generates a planning progress string from a station
 * @param station station
 * @param fuelType fuel type
 * @returns planning progress string
 */
function generatePlanningProgress(station: ParsedStation, fuelType: FuelType): string {
    return station.planning[fuelType] || 'Not planned';
}