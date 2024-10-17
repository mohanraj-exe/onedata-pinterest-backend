const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');

const Pin = require('../models/pin');
const User = require("../models/user");

router.get('/users', async (req, res) => {
    const users_all = await User.find().lean();
    return res.status(200).json({ message: "Success", data: users_all });
});

router.get('/pin_all', async (req, res) => {
    const fetch_all_pins = await Pin.find().lean();
    return res.status(200).json({ message: "Success", data: fetch_all_pins });
});

router.get('/pin/:id', async (req, res) => {
    const { id } = req.params;
    const pin = await Pin.findById({ _id: id }).lean();
    return res.status(200).json({ message: "Success", data: pin });
});

router.patch('/pin_likes/:id', async (req, res) => {
    console.log("req:", req.body);
    const { id } = req.params;
    const { likeCount } = req.body;
    try {
        const pin = await Pin.findByIdAndUpdate(id,
            { likes: likeCount },
            { new: true }
        );
        console.log(pin);
        return res.status(200).json({ message: "Success", data: pin });
    }
    catch (error) {
        res.status(500).json({ error: 'Error updating likes', details: error });
    }
});

router.patch('/pin_followers_add/:id', async (req, res) => {
    const { id } = req.params;
    const { followerCount } = req.body;
    try {
        const pin = await Pin.findByIdAndUpdate(id,
            { 'author.followers': followerCount },
            { new: true }
        );
        return res.status(200).json({ message: "Success", data: pin });
    }
    catch (error) {
        res.status(500).json({ error: 'Error updating followers', details: error });
    }
});

router.patch('/pin_comments/:id', async (req, res) => {
    const { id } = req.params;
    const { newComment } = req.body;
    try {
        const commentObject = {
            _id: new mongoose.Types.ObjectId(),
            comment: newComment
        };
        const pin = await Pin.findByIdAndUpdate(id,
            { $push: { comments: commentObject } },
            { new: true }
        );
        return res.status(200).json({ message: "Success", data: pin });
    }
    catch (error) {
        res.status(500).json({ error: 'Error updating comments', details: error });
    }
});

module.exports = router;