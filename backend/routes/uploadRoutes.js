import express from 'express';
import { upload, uploadToS3 } from '../controllers/uploadController.js';

const router = express.Router();

router.post('/', upload.single('image'), uploadToS3);

export default router;
