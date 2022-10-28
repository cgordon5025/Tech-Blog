const router = require('express').Router();
const { User, Post, Comment } = require('../../models');


router.get('/', async (req, res) => {
    const postData = await Post.findAll({
        include: [{ model: Comment }, { model: User }]
    })
    const posts = postData.map((data) => data.get({ plain: true }));
    res.json(posts)
})
//lets make a new post
router.post('/', async (req, res) => {
    try {
        const postData = await Post.create({
            post_title: req.body.post_title,
            post_text: req.body.post_text,
            user_id: req.session.userID
        })
        res.json(postData)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.put('/:id', async (req, res) => {
    try {
        const postData = await Post.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        if (!postData) {
            res.status(404).json({ message: "No post found with this id, please try again" });
            return;
        }
        res.json(postData)
    } catch (err) {
        res.status(500).json(err)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id
            }
        })
        if (!postData) {
            res.status(404).json({ message: "No post found with this id, please try again" });
            return;
        }
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router