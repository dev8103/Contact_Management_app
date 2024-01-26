// app server of express
const express = require('express');
const app = express();

// modules
const dotenv = require('dotenv').config();

// custom module
const contactRoutes = require('./routes/contactRoutes'); 
const userRoutes = require('./routes/userRoutes');
const errorHandler = require('./middleware/errorHandler');
const connectToDb = require('./config/dbConnection');

// port no.
const port = process.env.PORT;

// call the function to connect to database
connectToDb();

// builtin middleware for json file
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// all urls related to contacts
app.use('/api/contacts',contactRoutes);

// all urls related to users
app.use('/api/users',userRoutes);

// error handler
app.use(errorHandler);

// invalid urls handling..
app.all('*',(req,res)=>{
    res.status(404);
    res.json({message:'Oops, page not found'});
    res.send();
});

// Listening to the server
app.listen(port,()=>{
    console.log(`Server running on port no. ${port}`);
});