const router = require('express').Router();
const { User, Post, Comment } = require('../../models')
const bcrypt = require('bcrypt');

//URL here is localhost:3001/api/user/login
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });
        if (!userData) {
            res.status(404).json({ message: "Login failed please try again!" });
            return;
        }
        const validPassword = await bcrypt.compare(
            req.body.password,
            userData.password
        )
        if (!validPassword) {
            res.status(404).json({ message: "Login failed, please try again" });
            return;
        }
        res.status(200).json({ message: "you are now logged in! YAY" })
    } catch (err) {
        res.status(500).json(err)
    }
})

//if they want to sign up we will take their data and then put it into our database
router.post('/signup', async (req, res) => {
    try {
        const userData = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hash(req.body.password),
        })
        res.status(200).json(userData)
    } catch (err) {
        res.status(500).json(err)
    }
})