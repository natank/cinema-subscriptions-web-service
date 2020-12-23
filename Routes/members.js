import express from 'express';
import * as membersController from '../BL/membersController';

const router = express.Router();

router.get('/', membersController.findMembers);
router.get('/load', membersController.loadMembers);
router.put('/', membersController.createMember);
export default router;
