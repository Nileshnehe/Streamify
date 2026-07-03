import FriendRequest from "../models/friendRequest.model.js";
import User from "../models/user.model.js";

export const getRecommendedUsers = async (req, res) => {

    try {
        const currentUserId = req.user.id;
        const currentUser = req.user;

        const recommendedUsers = await User.find({
            $and: [
                { _id: { $ne: currentUserId } }, // exclude current user
                { $id: { $nin: currentUser.friends } }, // exclude current user's friends
                { isOnboarded: true }
            ]
        });

        res.status(200).json(recommendedUsers);
    } catch (error) {
        console.error("Error in getRecommendedUsers controller:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getMyFriends = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
            .select("friends")
            .populate("friends", "fullName profilePic nativeLanguage learningLanguage");

        res.status(200).json(user.friends);
    } catch (error) {
        console.error("Error in getMyFriends controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const sendFriendRequest = async (req, res) => {
    try {
        const myId = req.user.id;
        const { id: recipientId } = req.params;

        // prevent sending request to yourself
        if (myId === recipientId) {
            return res.status(400).json({ message: "you can't send friend request to your yourself" });
        }

        const recipient = await User.findById(recipientId)
        if (!recipient) {
            return res.status(404).json({ message: "Recipient not found" });
        }

        // check if user already friends
        if (recipient.friends.includes(myId)) {
            return res.status(400).json({ message: "You are already friends with this user" });
        }

        // check if request already exists
        const existingRequest = await FriendRequest.findOne({
            $or: [
                { sender: myId, recipient: recipientId },
                { sender: recipientId, recipient: myId },
            ],
        });

        if (existingRequest) {
            return res
                .status(400)
                .json({ message: "A friend request already exists between you and this user" });
        }

        const friendRequest = await FriendRequest.create({
            sender: myId,
            recipient: recipientId,
        });

        res.status(201).json(friendRequest)
    } catch (error) {
        console.error("Error in sendFriendRequest controller", error.message)
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const acceptFriendRequest = async (req, res) => {
    try {
        const { id: requestId } = req.params

        const friendRequest = await FriendRequest.findById(requestId);

        if (!friendRequest) {
            return res.status(404).json({ message: "Friend request not found" });
        }

        // verify the current user is the recipient 
        if (friendRequest.recipient.toString() !== req.user.id) {
            return res.status(403).json({ message: "You are not authorized to accept this request" });
        }
        friendRequest.status = "accepted";
        await friendRequest.save();

        //  add each user to the other's friend array
        await User.findByIdAndUpdate(friendRequest.sender, {
            $addToSet: { friends: friendRequest.recipient },
        });

        await User.findByIdAndUpdate(friendRequest.recipient, {
            $addToSet: { friends: friendRequest.sender },
        });

        res.status(200).json({ message: "Friend request accepted" });

    } catch (error) {
        console.log("Error in acceptFriendRequest controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getFriendRequests = async (req, res) => {
    try {
        const incomingRequest = await friendRequest.find({
            recipient: req.user.id,
            status: "pending",
        }).populate("sender", "fullName profilePic nativeLanguage learningLanguage");

        const acceptRequest = await FriendRequest.find({
            sender: req.user.id,
            status: "accept",
        }).populate("recipient", "fullName profilePic");

        res.status(200).json({ incomingRequest, acceptFriendRequest });
    } catch (error) {
        console.log("Error on getFriendRequests controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getOutgoingFriendRequests = async (req, res) => {
    try {
        const outgoingRequest = await FriendRequest.find({
            sender: req.user.id,
            status: "pending"
        }).populate("recipient", "fullName profilePic nativeLanguage learningLanguage");

        res.status(200).json(outgoingRequest);
    } catch (error) {
        console.log("Error in getOutgoingFriendRequests controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}