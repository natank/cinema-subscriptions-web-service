import express from 'express';
import * as subscriptionsController from '../BL/subscriptionsController';

const router = express.Router();

router.get('/', subscriptionsController.findSubscriptions);
router.put('/', subscriptionsController.createSubscription);
router.delete('/:id', subscriptionsController.deleteSubscription);

export default router;
