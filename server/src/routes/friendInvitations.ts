import Joi from "joi";
import exp from "express";
import auth from "../middleware/auth";
import {validator} from "./auth";
import {acceptFriendInvite, rejectFriendInvite, sendFriendInvite} from "../controllers/friendInvitations";

const router = exp.Router();

const sendFriendInvitationSchema = Joi.object({
    friendEmail: Joi.string().email().required(),
})

const handleFriendInvitationSchema = Joi.object({
    inviteID: Joi.string().required(),
})

router.use(auth);

router.post('/invite', validator.body(sendFriendInvitationSchema), sendFriendInvite)
router.post('/accept', validator.body(handleFriendInvitationSchema), acceptFriendInvite)
router.post('/reject', validator.body(handleFriendInvitationSchema), rejectFriendInvite)

export default router;
