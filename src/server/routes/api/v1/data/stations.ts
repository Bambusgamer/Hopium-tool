import type { Request, Response } from 'express';
import { StationSchema } from 'utils/models';

import generateStationsCSV from 'transformers/stations';

/**
 * Returns a CSV file containing all stations
 * @route GET /data/stations.csv
 * @returns A CSV file containing all stations
 */
export default {
    /**
     * @route GET /stations.csv
     */
    route: '/stations.csv',
    /**
      * Returns a CSV file containing all stations
      * @route GET /data/stations.csv
      * @param req The request object
      * @param res The response object
      * @returns A CSV file containing all stations
      */
    callback: function stations(req: Request, res: Response) {
        const Stations = req.db.model('Station', StationSchema);

        Stations.find({}).lean().then(stations => {
            res.setHeader('Content-Type', 'text/csv');
            res.setHeader('Content-Disposition', 'attachment; filename=stations.csv');
            res.send(generateStationsCSV(stations));
        }).catch(error => {
            console.error(error);
            res.status(500).send('Internal server error');
        });
    }
}