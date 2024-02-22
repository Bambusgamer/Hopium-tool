import { Router } from 'express';

/**
 * data route under which all data routes are nested
 * @route /data
 */
const dataRouter: Router = Router();

import combined from 'server/routes/api/v1/data/combined';
import stations from 'server/routes/api/v1/data/stations';
import downtimes from 'server/routes/api/v1/data/downtimes';
import fuelingEvents from 'server/routes/api/v1/data/fuelingEvents';

dataRouter.get(combined.route, combined.callback);
dataRouter.get(stations.route, stations.callback);
dataRouter.get(downtimes.route, downtimes.callback);
dataRouter.get(fuelingEvents.route, fuelingEvents.callback);


export default dataRouter;