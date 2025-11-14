import { Router } from 'express';
import * as weatherController from '@/api/v1/external/weather/current/controller';

const router = Router();

// Weather route
router.get('/weather/current', weatherController.getHandler);

export default router;
