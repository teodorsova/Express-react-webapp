var friendshipDB = require("../models/friendship")
const { Op } = require("sequelize");
const sequelize = require("../sequelize");

module.exports.findAll = async (req, res) => {
    try {
        const friendships = await friendshipDB.findAll();
        res.header("Access-Control-Allow-Origin", "*"); //TO PREVENT CORS
        console.log(req.body);
        return res.status(200).json(friendships);
    } catch (err) {
        return res.status(500).json(err);
    }
};

module.exports.findOneFriendship = async (req, res) => {
    try {
        const user1 = req.body.user1;
        const user2 = req.body.user2;
        console.log(user1)
        console.log(user2)
        const friendship = await friendshipDB.findOne({
            where:
            {
                user1: user1,
                user2: user2
            }
        });
        console.log(friendship)
        res.header("Access-Control-Allow-Origin", "*"); //TO PREVENT CORS
        console.log(req.body);
        if (!friendship || friendship.user2 !== user2 || friendship.user1 !== user1) {
            const reverseFriendship = await friendshipDB.findOne({
                where:
                {
                    user1: user2,
                    user2: user1
                }
            });
            if (!reverseFriendship || reverseFriendship.user1 !== user2 || reverseFriendship.user2 !== user1) {
                return res.status(404).json({ error: "Not found!" });
            } else if (reverseFriendship.user1 === user2 && reverseFriendship.user2 === user1) {
                return res.status(229).json(friendship);
            }
        } else if (friendship.isPending === true && friendship.user1 === user1 && friendship.user2 === user2) {
            return res.status(230).json(friendship);
        } else {
            return res.status(200).json(friendship);
        }
    } catch (err) {
        return res.status(500).json(err);
    }
};

module.exports.create = async (req, res) => {
    try {
        const user1 = req.body.user1;
        const user2 = req.body.user2;
        const newFriendship = await friendshipDB.create(req.body);
        res.header("Access-Control-Allow-Origin", "*");
       
        return res.status(200).json(newFriendship);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

module.exports.removeFriendship = async (req, res) => {
    try {
        const user1 = req.body.user1;
        const user2 = req.body.user2;
        await friendshipDB.destroy({
            where:
            {
                user1: user1,
                user2: user2
            }
        });
        await friendshipDB.destroy({
            where:
            {
                user1: user2,
                user2: user1
            }
        });
        return res.status(200).json({ message: "Success" });
    } catch (err) {
        return res.status(500).json(err);
    }
}

module.exports.acceptFriendship = async (req, res) => {
    try {
        const user1 = req.body.user1;
        const user2 = req.body.user2;
        await friendshipDB.update({ isPending: false }, {
            where:
            {
                user1: user2,
                user2: user1
            }
        });
        const newReverseFriendship = await friendshipDB.create(req.body);
        await friendshipDB.update({ isPending: false }, {
            where:
            {
                user1: user1,
                user2: user2
            }
        });
        return res.status(200).json({ message: "Success" });
    } catch(err) {
        return res.status(500).json(err);
    }
}

