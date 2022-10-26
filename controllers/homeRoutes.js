const router = require('express').Router();
const { post } = require('../controllera');
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

//lets start to build out the information and homepage info
//need to work on handlebars first
router.get('/', async (req, res) => {
    const postData = await Post.findAll({
        include: [{
            model: Comment,
            attributes: ['comment_text']
        }]
    });
    const posts = postData.map((post) => post.get({ plain: true }))
    res.render('test', {
        post,
        logged_in: req.session.logged_in
    })
}
)