const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model { }
//the Post is what a single user is posting, think of it like someone posted an image on instagram. They log into their account and post the image
//this post contains a title, which is the topic, and a text component, which is an article, description of the topic etc.
//we want to relate to the user ID to know who has posted it
Post.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        post_title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        post_text: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'post'
    }
);

//Maybe add allowNull:false to the foreign keys retroactively

module.exports = Post;