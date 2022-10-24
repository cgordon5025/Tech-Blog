//lets call down out libraries
const express = require('express');
//the most up to date version is 6.0.6
//the version in all classwork is 5.2.0
const exphbs = require('express-handlebars');

const app = express();
const path = require('path')
//note routes might be changes to controllers
const routes = require('./controllers');
const sequelize = require('./config/connection');




const PORT = process.env.PORT || 3001;
//creating the handlebars environment, expect output to be handlebar
const hbs = exphbs.create({});
//engine is how we're delivering the data to a certain location
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes)
app.use(express.static(path.join(__dirname, 'public')));
app.listen(PORT, () => {
    console.log(`App Listening on port ${PORT}`)
})