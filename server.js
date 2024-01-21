// app server of express
const express = require('express');
const app = express();

// custom module
const contactRoutes = require('./routes/contactRoutes'); 

// port no.
const port = 5000;

// builtin middleware for json file
app.use(express.json());

// crud operations for /api/contact path
app.use('/api/contacts',contactRoutes);

// Listening to the server
app.listen(port,()=>{
    console.log(`Server running on port no. ${port}`);
});