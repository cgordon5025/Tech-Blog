const express = require('express');
const app = express()
//note routes might be changes to controllers
const routes = require('./routes')
const sequelize =  require('./config/connection')
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(PORT, () => {
    console.log(`App Listening on port ${PORT}`)
})