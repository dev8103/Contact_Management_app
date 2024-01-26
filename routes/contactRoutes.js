const express = require('express');
const router = express.Router();
const validateToken = require('../middleware/validataTokenHandler');

// custom module for controllers
const { 
    getContact, 
    getContactById, 
    createContact, 
    updateContact, 
    deleteContact } = require('../controllers/contactController');

//validate token for user for privacy only current logged in user is allowed to access this routes
router.use(validateToken);

// create
router.route('/').post(createContact);
// read
router.route('/').get(getContact);
router.route('/:id').get(getContactById);
// update
router.route('/:id').put(updateContact);
// delete
router.route('/:id').delete(deleteContact);


module.exports = router;