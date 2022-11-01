const { Model, DataTypes, TEXT } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model { }
// A comment can belong to any user and be attached to any post, think about how you and many other leave comments on instagram pics or any social media you may have
Comment.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    comment_text: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id',
        }
    },
    post_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'post',
            key: 'id',
        },
    },
},
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: false,
        modelName: 'comment'
    }
);

module.exports = Comment
