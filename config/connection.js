//Below importing the mongoose library
const mongoose = require('mongoose');
//connecting the MongoDB using MongoDB URI provided in the environment variables/using the default URI in the environment if not set
mongoose.connect(process.env.MONOGDB_URI || 'mongodb://localhost:3001/You&YourFriends',{
    useNewUrlParser: true, 
    useUnifiedTopology: true,
});

//Below we are exporting the connection to the db as a module
module.exports = mongoose.connection