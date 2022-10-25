const { Comment } = require('../models')

const commentData = [
    {
        comment_text: "what no way, Javascript sucks!",
        user_id: 2,
        post_id: 1,
    },
    {
        comment_text: "Respectively you are wrong, JavaScript is amazing!",
        user_id: 1,
        post_id: 2,
    }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments