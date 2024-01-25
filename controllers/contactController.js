const asyncHandler = require('express-async-handler');

// custom module
const contactModel = require('../models/contactModel');

// @desc get all contacts
// @route GET /api/contacts
// @access public
const getContact = asyncHandler(async (req,res)=>{
    const contacts = await contactModel.find();
    // res.status(200).json({message : 'all contacts...'});
    res.status(200).json(contacts);
});

// @desc get contact by id
// @route GET /api/contacts/id
// @access public
const getContactById = asyncHandler(async(req,res)=>{
    const contact = await contactModel.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
})

// @desc Create New Contact
// @route POST /api/contacts
// @access public
const createContact = asyncHandler(async(req,res)=>{
    const {name,email,phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All Fields are mendatory.")
    }
    const contact = await contactModel.create({
        name,
        email,
        phone,
    });
    // res.status(201).json({message : 'Create new contact.'});
    // res.write('New Contact created..');
    res.status(201).json(contact);
})

// @desc Update Contact
// @route POST /api/contacts/id
// @access public
const updateContact = asyncHandler(async(req,res)=>{
    // fetch the contact
    const contact = await contactModel.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    
    const updatedcontact = await contactModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.status(200).json(updatedcontact);
})

// @desc Delete Contact
// @route POST /api/contacts/id
// @access public
const deleteContact = asyncHandler(async(req,res)=>{
    // fetch the contact
    const contact = await contactModel.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }

    const deletedcontact = await contactModel.findByIdAndDelete(req.params.id);
    res.status(200).json(deletedcontact);
})

// Export module
module.exports = {
    getContact,
    getContactById,
    createContact,
    updateContact,
    deleteContact};