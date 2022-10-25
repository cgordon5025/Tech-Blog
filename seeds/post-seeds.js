const { Post } = require('../models')

const postData = [
    {
        post_title: "I like JavaScript",
        post_text: "JavaScript is really cool and can do a lot of things",
        user_id: 1,
    },
    {
        post_title: "I don't like Javascript",
        post_text: "Javascript is Stupid and i Hate it",
        user_id: 2,
    }
]

const seedPosts = () => Post.bulkCreate(postData)

module.exports = seedPosts