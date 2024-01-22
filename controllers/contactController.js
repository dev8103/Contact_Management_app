const asyncHandler = require('express-async-handler');

// @desc get all contacts
// @route GET /api/contacts
// @access public
const getContact = asyncHandler(async(req,res)=>{
    // res.status(200).send('Get all contacts...');
    res.status(200).json({message : 'Get all contacts...'});
});

// @desc get contact by id
// @route GET /api/contacts/id
// @access public
const getContactById = asyncHandler(async(req,res)=>{
    res.status(200).json({message :`Get contact for ${req.params.id}`});
})

// @desc Create New Contact
// @route POST /api/contacts
// @access public
const createContact = asyncHandler(async(req,res)=>{
    const {name,id,contact} = req.body;
    if(!name || !id || !contact){
        res.status(400);
        throw new Error("All Fields are mendatory.")
    }
    res.status(201).json({message : 'Create new contact.'});
})

// @desc Update Contact
// @route POST /api/contacts/id
// @access public
const updateContact = asyncHandler(async(req,res)=>{
    res.status(200).json({message : `Update contact for ${req.params.id}`});
})

// @desc Delete Contact
// @route POST /api/contacts/id
// @access public
const deleteContact = asyncHandler(async(req,res)=>{
    res.status(200).json({message : `Delete contact for ${req.params.id}`});
})

// Export module
module.exports = {
    getContact,
    getContactById,
    createContact,
    updateContact,
    deleteContact};