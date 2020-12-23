import express from 'express';
import * as moviesController from '../BL/moviesController';

const router = express.Router();

router.get('/', moviesController.findMovies);
router.get('/load', moviesController.loadMovies);

export default router;
