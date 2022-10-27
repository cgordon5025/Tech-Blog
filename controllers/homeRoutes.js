const router = require('express').Router();
// const { post } = require('../controllera');
const { User, Post, Comment } = require('../models');
const { findAll } = require('../models/User');
const withAuth = require('../utils/auth');

//this should be localhost:3001/signup
router.get('/signup', async (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/')
        return
    }
    res.render('signup')
}
)

router.get('/login', async (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/')
        return
    }
    res.render('login')
})
//this is the homepage
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [{
                model: Comment,
                attributes: ['comment_text', 'user_id']
            },
            {
                model: User,
                attributes: ['username']
            }]
        })
        const posts = postData.map((post) =>
            post.get({ plain: true })
        )
        console.log("finding the user who posted")

        res.render('homepage', {
            posts
        })
    } catch (err) {
        res.status(500).json(err)
    }

})

//this is the dashboard with only your posts
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: { user_id: req.session.userID }

        })
        const posts = postData.map((post) =>
            post.get({ plain: true })
        )
        res.render('dashboard', {
            posts
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router