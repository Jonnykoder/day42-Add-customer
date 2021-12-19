// Declare Core Modules
const express = require('express');
const router = express.Router();
const regController = require('../controllers/authAccount'); 
//inside the authAccount will be sql statements or database manipulation


router.post('/login', regController.login);
router.post('/addingcustomer', regController.register);
router.get('/updateForm/:email', regController.update_form);
router.post('/update_save', regController.update_save);
router.get('/delete/:email', regController.delete_user)

// Exports Router Module
module.exports = router;