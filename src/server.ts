import mongoose from 'mongoose';
import dotenv from 'dotenv';
import express from 'express';

import { FuelType } from 'types';

import { StationSchema, FuelingEventSchema, DownTimeSchema } from './models';

import generateStationsCSV from 'transformers/stations';
import generateFuelingEventsCSV from 'transformers/fuelingEvents';
import generateDowntimesCSV from 'transformers/downTimes';
import createZip from 'transformers/zip';

dotenv.config();

if (!process.env.MONGO_URI || !process.env.PORT) throw new Error('Please provide MONGO_URI and PORT');

const connection = mongoose.createConnection(process.env.MONGO_URI);

const app = express();

app.get('/', (req, res) => {
    const Downtimes = connection.model('DownTime', DownTimeSchema);
    const FuelingEvents = connection.model('FuelingEvent', FuelingEventSchema);
    const Stations = connection.model('Station', StationSchema);

    const stations = Stations.find({}).lean();
    const downtimes = Downtimes.find({}).lean();
    const fuelingEvents = FuelingEvents.find({}).lean();

    Promise.all([stations, downtimes, fuelingEvents]).then(([stations, downtimes, fuelingEvents]) => {
        res.setHeader('Content-Type', 'application/zip');
        res.setHeader('Content-Disposition', 'attachment; filename=export.zip');

        const stream = createZip({
            stations: generateStationsCSV(stations),
            downtimes: generateDowntimesCSV(downtimes),
            fuelingEvents: generateFuelingEventsCSV(fuelingEvents)
        });

        stream.once('end', () => res.end());

        stream.pipe(res);
    }).catch(error => {
        console.error(error);
        res.status(500).send('Internal server error');
    });
});

app.get('/stations.csv', (req, res) => {
    const Stations = connection.model('Station', StationSchema);

    Stations.find({}).lean().then(stations => {
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=stations.csv');

        res.send(generateStationsCSV(stations));
    }).catch(error => {
        console.error(error);
        res.status(500).send('Internal server error');
    });
});

app.get('/fueling-events.csv', (req, res) => {
    const FuelingEvents = connection.model('FuelingEvent', FuelingEventSchema);

    FuelingEvents.find({}).lean().then(fuelingEvents => {
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=fueling-events.csv');

        res.send(generateFuelingEventsCSV(fuelingEvents));
    }).catch(error => {
        console.error(error);
        res.status(500).send('Internal server error');
    });
});

app.get('/downtimes.csv', (req, res) => {
    const Downtimes = connection.model('DownTime', DownTimeSchema);

    Downtimes.find({}).lean().then(downtimes => {
        res.setHeader('Content-Type', 'text/csv');
        res.setHeader('Content-Disposition', 'attachment; filename=downtimes.csv');

        res.send(generateDowntimesCSV(downtimes));
    }).catch(error => {
        console.error(error);
        res.status(500).send('Internal server error');
    });
});

export default function startServer() {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
}