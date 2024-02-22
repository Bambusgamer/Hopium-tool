import type { Request, Response } from 'express';
import { DowntimeSchema } from 'utils/models';

import generateDowntimesCSV from 'transformers/downtimes';

/**
 * Returns a CSV file containing all downtimes
 * @route GET /data/downtimes.csv
 * @returns A CSV file containing all downtimes
 */
export default {
    /**
     * @route GET /downtimes.csv
     */
    route: '/downtimes.csv',
    /**
      * Returns a CSV file containing all downtimes
      * @route GET /data/downtimes.csv
      * @param req The request object
      * @param res The response object
      * @returns A CSV file containing all downtimes
      */
    callback: function downtimes(req: Request, res: Response) {
        const Downtimes = req.db.model('Downtime', DowntimeSchema);

        Downtimes.find({}).lean().then(downtimes => {
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader('Content-Disposition', 'attachment; filename=downtimes.csv');
            res.send(generateDowntimesCSV(downtimes));
        }).catch(error => {
            console.error(error);
            res.status(500).send('Internal server error');
        });
    }
}