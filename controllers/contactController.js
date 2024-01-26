const asyncHandler = require('express-async-handler');

// custom module
const contactModel = require('../models/contactModel');

// @desc get all contacts
// @route GET /api/contacts
// @access private
const getContact = asyncHandler(async (req,res)=>{
    const contacts = await contactModel.find({user_id:req.user.id});
    // res.status(200).json({message : 'all contacts...'});
    res.status(200).json(contacts);
});

// @desc get contact by id
// @route GET /api/contacts/id
// @access private
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
// @access private
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
        user_id:req.user.id,
    });
    // res.status(201).json({message : 'Create new contact.'});
    // res.write('New Contact created..');
    res.status(201).json(contact);
})

// @desc Update Contact
// @route POST /api/contacts/id
// @access private
const updateContact = asyncHandler(async(req,res)=>{
    // fetch the contact
    const contact = await contactModel.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }

    if(contact.user_id.toString() !== req.user.id)
    {
        res.status(403);
        throw new Error("User don't have permission to update other's contacts.");
    }
    
    const updatedcontact = await contactModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
    res.status(200).json(updatedcontact);
})

// @desc Delete Contact
// @route POST /api/contacts/id
// @access private
const deleteContact = asyncHandler(async(req,res)=>{
    // fetch the contact
    const contact = await contactModel.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }

    if(contact.user_id.toString() !== req.user.id)
    {
        res.status(403);
        throw new Error("User don't have permission to delete other's contacts.");
    }

    const deletedcontact = await contactModel.deleteOne({_id:req.params.id});
    res.status(200).json(deletedcontact);
})

// Export module
module.exports = {
    getContact,
    getContactById,
    createContact,
    updateContact,
    deleteContact};