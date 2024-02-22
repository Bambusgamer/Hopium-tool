import axios, { AxiosResponse } from 'axios';
import { baseUrl } from 'utils/constants';
import parseToken from 'parsers/token';

/**
 * Scrapes the token from the h2.live website
 * @returns token for the h2.live API
 * @throws error if token could not be found
 * @throws error if request to h2.live failed
 */
export default async function scrapeToken(): Promise<string> {
    try {
        const res = await axios.get<string>(baseUrl);

        return parseToken(res.data);
    } catch (error) {
        console.error(error);
        throw new Error('Failed to scrape token from h2.live');
    }
}