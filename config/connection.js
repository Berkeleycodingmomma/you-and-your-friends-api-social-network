//Below importing the mongoose library
const {connect,connection} = require('mongoose');
//connecting the MongoDB using MongoDB URI provided in the environment variables/using the default URI in the environment if not set
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/friendsDB'

connect(connectionString, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    });

//Below we are exporting the connection to the db as a module
module.exports = connection;


//Extra notes for me to remember: 
//use this command to open mongodb compass from terminal:  /Applications/MongoDB\ Compass.app/Contents/MacOS/MongoDB\ Compass