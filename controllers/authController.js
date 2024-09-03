const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Conversation = require('../models/Conversation')
const jwt = require("jsonwebtoken");
exports.login = async function (req, res) {
    const { username, password } = req.body;
    try {
        // Check if the user is present on the database
        const checkUser = await User.findOne({ username }).exec();
        if (!checkUser) {
            res.status(403).json({
                content: username + " not found",
            });
        }
        console.log(checkUser);

        // Comparing password from user to the database
        const passwordMatch = await bcrypt.compare(password, checkUser.password);
        if (!passwordMatch) {
            return res.status(401).json({
                content: "Password is incorrect",
            });
        }

        // Generate JWTOKEN
        const accessToken = jwt.sign(
            { username: checkUser.username },
            "my_secret",
            { expiresIn: "1h" }
        );
        console.log(res.cookie);
        // Save token to cookies
        res.cookie("jwt", accessToken, {
            httpOnly: true,
            secure: true,
            maxAge: 24 * 60 * 60 * 1000,
        });

        res.status(200).json({
            content: accessToken
        });


    } catch (err) { }
};
exports.registerAccount = async function (req, res) {
    const { username, password } = req.body;
    console.log(username);
    console.log(password);
    try {
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
            username: username,
            password: hashedPassword,
        });
        await newUser.save();


        const getCurrentUser = await User.findOne({ username: newUser.username });

        if (getCurrentUser.conversation.length < 1) {

            const NewConversation = new Conversation({
            });

            await NewConversation.save();

            getCurrentUser.conversation.push(NewConversation);

            await getCurrentUser.save();
        }

        res.status(200).json({
            content: hashedPassword,
            user: newUser,
        });
    } catch (err) {
        console.log(err);
    }
};


exports.getCurrentUser = async function (req, res) {
    try {

        const token = req.cookies.jwt || req.header('Authorization').replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({
                content: "Authorization token is missing",
            });
        }

        const decoded = jwt.verify(token, "my_secret");

        const user = await User.findOne({ username: decoded.username }).exec();

        if (!user) {
            return res.status(404).json({
                content: "User not found",
            });
        }

        res.status(200).json({
            content: user,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            content: "An error occurred while retrieving the user",
        });
    }
};

exports.getAlltUser = async function (req, res) {
    try {

        const user = await User.find().exec();

        if (!user) {
            return res.status(404).json({
                content: "User not found",
            });
        }

        res.status(200).json({
            content: user,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            content: "An error occurred while retrieving the user",
        });
    }
};