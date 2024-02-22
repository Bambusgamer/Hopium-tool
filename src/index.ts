import dotenv from 'dotenv';

import scraper from 'scraper';
import startServer from 'server';

dotenv.config();

if (!process.env.INTERVAL_MINUTES) throw new Error('INTERVAL_MINUTES not set');
if (Number.isNaN(Number(process.env.INTERVAL_MINUTES))) throw new Error('INTERVAL_MINUTES is not a number');

function scrape() {
    try {
        scraper();
    } catch (error) {
        console.error(error);
    }
}

setInterval(scrape, Number(process.env.INTERVAL_MINUTES) * 60 * 1000);
scrape();

startServer();