import { type Request, type Response } from 'express';
import { StationSchema, FuelingEventSchema, DowntimeSchema } from 'utils/models';

import generateStationsCSV from 'transformers/stations';
import generateFuelingEventsCSV from 'transformers/fuelingEvents';
import generateDowntimesCSV from 'transformers/downtimes';
import createZip from 'transformers/zip';

/**
 * Returns a zip file containing CSV files for stations, downtimes, and fueling events
 * @route GET /data/combined.zip
 */
export default {
    /**
     * @route GET /combined.zip
     */
    route: '/combined.zip',
    /**
      * Returns a zip file containing CSV files for stations, downtimes, and fueling events
      * @route GET /data/combined.zip
      * @param req The request object
      * @param res The response object
      * @returns A zip file containing CSV files for stations, downtimes, and fueling events
      */
    callback: function combined(req: Request, res: Response) {
        const Downtimes = req.db.model('Downtime', DowntimeSchema);
        const FuelingEvents = req.db.model('FuelingEvent', FuelingEventSchema);
        const Stations = req.db.model('Station', StationSchema);

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
    }
};
