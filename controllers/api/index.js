const router = require('express').Router();
// const something = require('./something')
const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes');
// router.use('/something', something)
router.use('/user', userRoutes);
router.use('/post', postRoutes);
router.use('/comment', commentRoutes);

router.get('/', (req, res) => {
    res.render('main')
})


module.exports = router;
