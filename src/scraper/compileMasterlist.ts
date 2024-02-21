import { type ParsedStation, FuelType } from 'types';
import { type Response } from 'scraper/requestH2LiveLists';

import parseStation from 'parsers/station';

/**
 * Compiles the masterlists into a single list and parses the data
 * @param masterlists masterlists from the h2.live API sorted by fuel type
 * @returns object containing the compiled data
 */
export default function compileMasterlist(masterlists: Response['masterlist']): Map<string, ParsedStation> {
    const list = new Map<string, ParsedStation>();

    for (const key of Object.keys(masterlists)) {
        for (const station of masterlists[key as keyof Response['masterlist']]) {
            if (!station.idx || typeof station.idx !== 'string') continue;

            const parsedStation = parseStation(station, key as FuelType);

            const existingStation = list.get(station.idx);
            if (!existingStation)
                list.set(station.idx, parsedStation);
            else
                list.set(station.idx, {
                    ...existingStation,
                    fuelTypes: [...existingStation.fuelTypes, ...parsedStation.fuelTypes],
                    prices: {
                        ...existingStation.prices,
                        ...parsedStation.prices
                    },
                    planning: {
                        ...existingStation.planning,
                        ...parsedStation.planning
                    }
                });
        }
    }

    return list;
}