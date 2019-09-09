const express = require('express');
const app     = express();
const serverPort = 3000;
const morgan = require('morgan'); //middleware
const routes = require('./routes/index');
const routesMovies = require('./routes/movies');
const routesUsers = require('./routes/users');
const routeState = require('./routes/stateServer');
const routeQuest = require('./routes/questions');
const mongoose = require('mongoose');


//setting
app.set('port', process.env.PORT || serverPort); //process.env.PORT in case that exist default port (heroku/etc)
app.set('json spaces', 2);

//DB
mongoose.connect('mongodb://localhost/questionary')
    .then( db => console.log('OK conecction'))
    .catch(err => console.log(err));


//init the middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false})); //understand form data 
app.use(express.json()); //for work with json

//routes
app.use(routes);
app.use(routesMovies);
app.use(routesUsers);
app.use(routeState);
app.use(routeQuest);

//start server
app.listen(app.get('port'), () => {
    console.log('Server on port ' + serverPort);
});