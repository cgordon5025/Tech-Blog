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

router.get('/dashboard', async (req, res) => {
    try {
        const postData = await Post.findAll({
            // include: [{
            //     model: Comment,
            //     attributes: ['comment_text', 'user_id']
            // }]
        })
        const posts = postData.map((post) =>
            post.get({ plain: true })
        )
        // posts.userPost = await User.findByPk({
        //     where: {
        //         id: posts.user_id
        //     }
        // })
        console.log(postData)
        console.log("posts")
        console.log(posts)
        res.render('dashboard', {
            posts
        })
    } catch (err) {
        res.status(500).json(err)
    }

})
module.exports = router