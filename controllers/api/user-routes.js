const router = require('express').Router();
const { User, Post, Comment } = require('../../models')
const bcrypt = require('bcrypt');

//URL here is localhost:3001/api/user/login

router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll({
            include: [{ model: Post }, { model: Comment }]
        });
        const users = userData.map((data) => data.get({ plain: true }))
        console.log("showing all user info")
        console.log(users)
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json(err)
    }
})
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });
        if (!userData) {
            res.status(404).json({ message: "Login failed please try again!" });
            return;
        }
        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(404).json({ message: "Incorrect password, please try again" });
            return;
        }
        req.session.save(() => {
            req.session.loggedIn = true;
            res.status(200).json({ message: "you are now logged in! YAY" })
        });
    } catch (err) {
        res.status(500).json(err)
    }
})

//if they want to sign up we will take their data and then put it into our database
router.post('/signup', async (req, res) => {
    try {
        // res.json(req.body)
        const userData = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        })
        req.session.save(() => {
            req.session.loggedIn = true;
            res.status(200).json(userData)
        });
    } catch (err) {
        res.status(500).json(err)
    }
})

router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end()
        });
    } else {
        res.status(404).end()
    }
});

module.exports = router