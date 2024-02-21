import axios, { AxiosResponse } from 'axios';
import { FuelTypes, type FuelType, type StatusResponse, type MasterResponse, type StationStatus, type Station } from '../types';
import { apiUrl } from '../constants';

export interface Response {
    masterlist: {
        [key in FuelType]: Station[];
    };
    statuslist: {
        [key in FuelType]: StationStatus[];
    };
}

/**
 * Retrieves the required datalists from the h2.live API using the token
 * @param token token for the h2.live API
 * @returns object containing the combined data
 */
export default async function requestH2LiveLists(token: string): Promise<Response> {
    try {
        const lists = await Promise.all(
            FuelTypes.map(fuelType => Promise.all([
                requestList<MasterResponse>(token, 'masterlist', fuelType),
                requestList<StatusResponse>(token, 'statuslist', fuelType)
            ]))
        );

        const masterlist = lists.reduce((acc, [master, _], idx) => {
            acc[FuelTypes[idx]] = master.data.fuelstation;
            return acc;
        }, {} as Response['masterlist']);

        const statuslist = lists.reduce((acc, [_, status], idx) => {
            acc[FuelTypes[idx]] = status.data.fuelstation;
            return acc;
        }, {} as Response['statuslist']);

        return {
            masterlist,
            statuslist
        };
    } catch (error) {
        console.error(error);
        throw new Error('Failed to request lists from h2.live');
    }
}

/**
 * Retrieves a list from the h2.live API
 * @param token token for the h2.live API
 * @param list list to retrieve
 * @param fuelType fuel type to retrieve from the list
 * @returns list with data
 */
async function requestList<T>(token: string, list: 'masterlist' | 'statuslist', fuelType: FuelType) {
    return axios.get<T>(`${apiUrl}/${list}?fuel_type=${fuelType}&language=de&__show_permclosed__=1`, {
        headers: {
            'x-api-token': token
        }
    })
}