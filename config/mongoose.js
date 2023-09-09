const mongoose = require('mongoose');
main().catch(err => console.log(err));

// Connecting to a MongoDB Database "task-list-db" URI - mongodb://localhost:27017
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/codeial-db');
}

const db = mongoose.connection;

//Error
db.on('error', function(err) { 
    console.log(err.message); 
});

//up and running then print the message
db.once('open', function() {
    console.log("Successfully connected to the database - Codeial");
});