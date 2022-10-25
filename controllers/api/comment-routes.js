const router = require('express').Router();
const { User, Post, Comment } = require('../../models');


router.get('/', async (req, res) => {
    const commentData = await Comment.findAll({
        include: [{ model: Post }, { model: User }]
    })
    const comments = commentData.map((data) => data.get({ plain: true }));
    res.json(comments)
})

module.exports = router