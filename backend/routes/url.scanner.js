import express from 'express';
import { scanURL } from '../controller/url.controller.js';
import { authenticate } from '../auth.middleware.js';

const router = express.Router();

router.post('/scan-url', authenticate, scanURL);

export default router;