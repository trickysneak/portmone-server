import { Router } from 'express';
import { DebugController } from '../controllers/debug.controller.js';

const r = Router();
r.get('/health', DebugController.health);
r.post('/reset', DebugController.reset);
r.post('/seed', DebugController.seed);

export default r;
