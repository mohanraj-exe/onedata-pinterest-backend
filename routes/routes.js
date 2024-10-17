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

// router.patch('/pin/:id', async (req, res) => {
//     const { id } = req.params;
//     // const { username
//         // comment, follow
//     // } = req.body;
//     // console.log(req.body, id);
//     try {

//         const user = await User.findByIdAndUpdate(id,
//             {
//                 name: "cook"
//             },
//             { new: true });
//         return res.status(200).json({ message: "Success", data: user });
//     }
//     catch (error) {
//         res.status(500).json({ error: 'Error updating likes', details: error });
//     }
// });

// const SignUp = async (req, res) => {

//     try {
//         const { name, email, password } = req.body;

//         const user = await User.findOne({ email: email }).lean();

//         if(!user){
//             const hash_password = await bcrypt.hash(password, saltRounds);

//             await User.create({
//                 name: name,
//                 email: email,
//                 password: hash_password
//             });

//             return res.status(201).json({ Message: "User signed up successfully" });

//         } else{
//             return res.status(200).json({ Message: "Email already exists" });
//         }
//     } catch (err) {
//         return res.status(400).json({ data: err })
//     }
// }

// const Login = async (req, res) => {

//     try {
//         const { email, password } = req.body;

//         const user = await User.findOne({ email: email }).lean();

//         if(!user){
//             return res.status(200).json({ Message: "User not found" });
//         }

//         const password_match = await bcrypt.compare(password, user.password);

//         if(!user || !password_match){
//             return res.status(200).json({ Message: "User not found" });
//         }

//         if(user && password_match){
//             const token = GenerateToken({ email: user.email });
//             return res.status(200).json({ email: user.email, token })

//         } 

//     } catch (err) {
//         return res.status(400).json({ data: err })
//     }
// }

// const UserProfile = async (req, res) => {

//     try {

//         // console.log(req.body);

//         const { age, gender, dob, mobile } = req.body;

//         const profile = await User.findByIdAndUpdate({_id: req.user_details._id }, {

//             age: age,
//             gender: gender,
//             dob: dob,
//             mobile: mobile

//         }, { new: true });

//         return res.status(200).json({ Message: "Profile updated successfully", data: profile });

//     } catch (err) {
//         return res.status(400).json({ data: err });
//     }
// }

module.exports = router;