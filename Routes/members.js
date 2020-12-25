import express from 'express';
import * as membersController from '../BL/membersController';

const router = express.Router();

router.get('/:_id', membersController.findMember);
router.get('/load', membersController.loadMembers);
router.post('/', membersController.createMember);
router.put('/', membersController.updateMember);
router.delete('/:_id', membersController.deleteMember);
export default router;
