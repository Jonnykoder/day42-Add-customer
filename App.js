// Declare Core Modules
const express = require('express');
const path = require('path');
const port = process.env.PORT || 3001; //3000, 5000, 7000 
const dotenv = require('dotenv');
const local=('localhost');



// const hbs = require('express-handlebars');

// Instantiate Express Core Module
const app = express();


//register public folder to express 
app.use(express.static(__dirname + '/public'));

// dotenv configuration
dotenv.config({path: './.env'});


// setting hbs
app.set('view engine', 'hbs');

//parse the body
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// setting the Route Folder
app.use('/auth', require('./routes/auth'));
app.use('/', require('./routes/registerRoutes'));



// Initiate Server
app.listen(port, function (response, request) {
    console.log(`Server running at http://${local}:${port}`);
});

