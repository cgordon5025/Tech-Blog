const e = require('express');
const { User } = require('../models');

const userData = [
    {
        username: "john",
        email: "john@gmail.com",
        password: "Root1234"
    },
    {
        username: "Sally",
        email: "sally@gmail.com",
        password: "Root1234"
    }
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers