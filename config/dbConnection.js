const mongoose = require('mongoose');
const connectionString = process.env.CONNECTION_STRING;

const connectToDb = async () => {
    try {
        const connect = await mongoose.connect(connectionString);
        console.log('Database Connected to : ',connect.connection.name);
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectToDb;