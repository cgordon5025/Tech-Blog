const router = require('express').Router();
const { User, Post, Comment } = require('../../models');


router.get('/', async (req, res) => {
    const commentData = await Comment.findAll({
        include: [{ model: Post }, { model: User }]
    })
    const comments = commentData.map((data) => data.get({ plain: true }));
    res.json(comments)
})
//make a new comment
router.post('/', async (req, res) => {
    try {
        const commentData = await Comment.create({
            comment_text: req.body.comment_text,
            user_id: req.body.user_id,
            post_id: req.body.post_id
        })
        res.json(commentData)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.put('/:id', async (req, res) => {
    try {
        const commentData = await Comment.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        if (!commentData) {
            res.status(404).json({ message: "No comment found with this ID, please try aain" })
        }
        res.json(commentData)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                id: req.params.id
            }
        })
        if (!commentData) {
            res.status(404).json({ message: "No comment found with this id, please try again" });
            return;
        }
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router