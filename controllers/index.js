const router = require('express').Router();
const apiRoutes = require('./api');

//need index in the PAI folder to get this to work
router.get('/', (req, res) => {
    res.render('test')
})

router.use('/api', apiRoutes);

router.use((req, res) => {
    res.send("<h1>Wrong Route!</h1>")
});

module.exports = router;