const express = require('express');
const router = express.Router();

// custom module for controllers
const { 
    getContact, 
    getContactById, 
    createContact, 
    updateContact, 
    deleteContact } = require('../controllers/contactController');

// get
router.route('/').get(getContact);
router.route('/:id').get(getContactById);
// create
router.route('/').post(createContact);
// update
router.route('/:id').put(updateContact);
// delete
router.route('/:id').delete(deleteContact);


module.exports = router;