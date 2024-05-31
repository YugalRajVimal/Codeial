const mongoose = require('mongoose');
main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/codeial-db');
}
const db = mongoose.connection;
db.on('error', function(err) { 
    console.log(err.message); 
});
db.once('open', function() {
    console.log("Successfully connected to the database - Codeial");
});