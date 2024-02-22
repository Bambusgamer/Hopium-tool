import { Router } from 'express';

/**
 * v1 route under which all v1 routes are nested
 * @route /api/v1
 */
const v1Router: Router = Router();

import dataRouter from 'server/routes/api/v1/data';

v1Router.use('/data', dataRouter);


export default v1Router;