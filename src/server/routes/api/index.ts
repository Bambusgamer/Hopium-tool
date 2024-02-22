import { Router } from 'express';

/**
 * api route under which all api routes are nested
 * @route /api
 */
const apiRouter: Router = Router();

import v1Router from 'server/routes/api/v1';

apiRouter.use('/v1', v1Router);


export default apiRouter;