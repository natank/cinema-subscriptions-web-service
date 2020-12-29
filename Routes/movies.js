import express from 'express';
import * as moviesController from '../BL/moviesController';

const router = express.Router();

router.get('/', moviesController.findMovies);
router.get('/:_id', moviesController.findMovie);
router.get('/load', moviesController.loadMovies);
router.delete('/:_id', moviesController.deleteMovie);
router.put('/', moviesController.updateMovie);
router.post('/', moviesController.createMovie);

export default router;
