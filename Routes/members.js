import express from 'express';
import * as membersController from '../BL/membersController';

const router = express.Router();

router.get('/', membersController.findMembers);
router.get('/load', membersController.loadMembers);
router.get('/:_id', membersController.findMember);
router.put('/', membersController.updateMember);
router.post('/', membersController.createMember);
router.delete('/:_id', membersController.deleteMember);
export default router;
