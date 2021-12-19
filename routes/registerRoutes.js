const express = require('express');
const router = express.Router();


router.get('/', (request, response) => {
    response.render('index'); //view the filename index.hbs
});

router.get('/addingcustomer', (request, response) => {
    response.render('addingcustomer'); //view the filename registration.hbs
});

router.get('/list', (request, response) => {
    response.render('list'); //Render the lis file
});


module.exports = router;