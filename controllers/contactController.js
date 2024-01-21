// @desc get all contacts
// @route GET /api/contacts

const { json } = require("express");

// @access public
const getContact = (req,res)=>{
    // res.status(200).send('Get all contacts...');
    res.status(200).json({message : 'Get all contacts...'});
};

// @desc get contact by id
// @route GET /api/contacts/id
// @access public
const getContactById = (req,res)=>{
    res.status(200).json({message :`Get contact for ${req.params.id}`});
}

// @desc Create New Contact
// @route POST /api/contacts
// @access public
const createContact = (req,res)=>{
    // JSON format
    console.log(`The request body is : ${JSON.stringify(req.body)}`);
    res.status(201).json({message : 'Create new contact.'});
};

// @desc Update Contact
// @route POST /api/contacts/id
// @access public
const updateContact = (req,res)=>{
    res.status(200).json({message : `Update contact for ${req.params.id}`});
}

// @desc Delete Contact
// @route POST /api/contacts/id
// @access public
const deleteContact = (req,res)=>{
    res.status(200).json({message : `Delete contact for ${req.params.id}`});
}

// Export module
module.exports = {
    getContact,
    getContactById,
    createContact,
    updateContact,
    deleteContact};