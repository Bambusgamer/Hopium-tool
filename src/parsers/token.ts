/**
 * html file is a vue.js app which contains the token as a hardcoded string
 */
const TokenRegex = /__t__=([^\/]+)\//;

/**
 * Retrieves the token from the html file
 * @param html html file from h2.live
 * @returns token for the h2.live API
 * @throws error if token could not be found
 */
export default function parseToken(html: string): string {
    const match = html.match(TokenRegex);

    if (match && match[1]) {
        return match[1]
    }

    throw new Error('Token could not be found in received html string');
}