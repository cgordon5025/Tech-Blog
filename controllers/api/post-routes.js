const router = require('express').Router();
const { User, Post, Comment } = require('../../models');


router.get('/', async (req, res) => {
    const postData = await Post.findAll({
        include: [{ model: Comment }, { model: User }]
    })
    const posts = postData.map((data) => data.get({ plain: true }));
    res.json(posts)
})

module.exports = router