import type { Request, Response } from 'express';
import { FuelingEventSchema } from 'utils/models';

import generateFuelingEventsCSV from 'transformers/fuelingEvents';

/**
 * Returns a CSV file containing all fueling events
 * @route GET /data/fueling-events.csv
 * @returns A CSV file containing all fueling events
 */
export default {
    /**
     * @route GET /fueling-events.csv
     */
    route: '/fueling-events.csv',
    /**
      * Returns a CSV file containing all fueling events
      * @route GET /data/fueling-events.csv
      * @param req The request object
      * @param res The response object
      * @returns A CSV file containing all fueling events
      */
    callback: function fuelingEvents(req: Request, res: Response) {
        const FuelingEvents = req.db.model('FuelingEvent', FuelingEventSchema);

        FuelingEvents.find({}).lean().then(fuelingEvents => {
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader('Content-Disposition', 'attachment; filename=fueling-events.csv');
            res.send(generateFuelingEventsCSV(fuelingEvents));
        }).catch(error => {
            console.error(error);
            res.status(500).send('Internal server error');
        });
    }
};