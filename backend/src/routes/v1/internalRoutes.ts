import { Router } from 'express';
import * as healthController from '@/api/v1/internal/health/controller';

const router = Router();

// Health check route
router.get('/health', healthController.getHandler);

// Feature-specific internal routes will be added here.

export default router;
