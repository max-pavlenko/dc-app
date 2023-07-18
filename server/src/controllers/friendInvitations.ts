import {Request, Response} from "express";
import {RequestWithUser} from "../middleware/auth";
import FriendInvitation from "../schemas/FriendInvitation";
import UserModel from "../schemas/User";
import {updateFriendInvitation} from "../socket.io/events/friendInvitation";
import {updateFriends} from "../socket.io/events/friends";

export async function sendFriendInvite(req: Request, res: Response) {

    const requestWithUser = req as RequestWithUser;

    const {friendEmail} = req.body;
    const {user: {userID, email}} = requestWithUser;

    if (friendEmail.toLowerCase() === email.toLowerCase()) return res.status(409).send({error: 'You cant make friendship with yourself, can you?'})

    const friend = await UserModel.findOne({email: friendEmail});
    if (!friend) return res.status(404).send({error: 'No user found with this mail'})

    const isAlreadyReceivedInvitation = await FriendInvitation.findOne({senderID: userID, receiverID: friend._id});
    if (isAlreadyReceivedInvitation) return res.status(409).send({error: 'Invitation to this user has already been sent'})

    const areUsersFriends = friend.friends.some((friendID) => friendID.toString() === userID);
    if (areUsersFriends) return res.status(409).send({error: 'You are already a friend with this user'});

    const newInvitation = await FriendInvitation.create({
        senderID: userID,
        receiverID: friend._id
    });

    await updateFriendInvitation({userID: friend._id.toString()})

    return res.status(201).send({email: friendEmail,});
}

export async function acceptFriendInvite(req: Request, res: Response) {
    const requestWithUser = req as RequestWithUser;
    const {inviteID} = req.body;
    const {user: {userID, email}} = requestWithUser;

    const invitation = await FriendInvitation.findById(inviteID);
    if (!invitation) return res.status(400).send({error: 'Trying to accept non-existing invitation!',})
    const {receiverID, senderID} = invitation;

    if(!senderID || !receiverID) return res.status(400).send({error: 'Invitation doesnt have receiver or sender',});

    await Promise.all([
        addFriend({userId: receiverID?.toString(), friendId: senderID}),
        addFriend({userId: senderID?.toString(), friendId: receiverID}),
        FriendInvitation.findByIdAndDelete(inviteID),
    ])

    await Promise.all([
        updateFriends({userID: senderID.toString()}),
        updateFriends({userID: receiverID.toString()}),
        updateFriendInvitation({userID}),
    ]);

    return res.status(201).send({inviteID,});
}

export async function addFriend({userId, friendId}: { userId?: string, friendId: any }) {
    const user = await UserModel.findById(userId);
    if (!user) throw new Error(`User with ID: ${userId} cant be found when adding friends`);
    user.friends = [...user.friends, friendId];
    await user.save();
}

export async function rejectFriendInvite(req: Request, res: Response) {
    try {
        const requestWithUser = req as RequestWithUser;
        const {inviteID} = req.body;
        const {user: {userID}} = requestWithUser;

        await FriendInvitation.findByIdAndDelete(inviteID);
        await updateFriendInvitation({userID});

        return res.status(200).send({inviteID,});
    } catch (e) {
        return res.status(400).send({error: '',});
    }
}
