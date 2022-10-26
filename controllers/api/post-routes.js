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
            user_id: req.body.user_id
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
        res.json(postData)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router