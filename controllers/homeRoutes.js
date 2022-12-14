const router = require('express').Router();
// const { post } = require('../controllera');
const { User, Post, Comment } = require('../models');
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
        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn
        })
    } catch (err) {
        res.status(500).json(err)
    }

})

//this is the dashboard with only your posts
router.get('/dashboard', withAuth, async (req, res) => {
    try {
        console.log(req.session.userID)
        const postData = await Post.findAll({
            where: { user_id: req.session.userID }

        })
        const posts = postData.map((post) =>
            post.get({ plain: true })
        )
        res.render('dashboard', {
            posts,
            loggedIn: req.session.loggedIn
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/newpost', async (req, res) => {
    try {
        res.render('newpost', {
            loggedIn: req.session.loggedIn,
            user_id: req.session.userID
        }
        )
    } catch (err) {
        res.status(500).json(err)
    }
})

router.get('/update/:id', withAuth, async (req, res) => {
    const user_id = req.session.userID
    const post_id = req.params.id
    try {
        const postData = await Post.findByPk(req.params.id);

        if (postData) {
            const post = postData.get({ plain: true });

            res.render('edit-post', {
                post,
                loggedIn: req.session.loggedIn,
                user_id,
                post_id
            });
        } else {
            res.status(404).end();
        }
    } catch (err) {
        res.redirect('login');
    }
});

router.get('/post/:id', async (req, res) => {
    const user_id = req.session.userID
    const post_id = req.params.id
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [{ model: Comment }, { model: User }]
        });
        const commentData = await Comment.findAll({
            where: { post_id: req.params.id },
            include: ({ model: User })
        })

        // console.log(commentData)
        const post = postData.get({ plain: true });
        const comments = commentData.map((comment) => comment.get({ plain: true }))
        console.log(post)
        res.render('single_post', {
            post,
            comments,
            loggedIn: req.session.loggedIn,
            user_id,
            post_id
        });

    } catch (err) {
        res.redirect('/');
    }
})


module.exports = router