const router = require("express").Router();

router.get("/", (req, res) => {
    res.json("WEE WE todo TESTING")
})

module.exports = router