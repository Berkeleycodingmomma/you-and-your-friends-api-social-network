// Here we are importing the User and Thought models from their respective files
const User = require('./User');
const Thought = require('./Thought');
// And now we are exporting the User and Thought models as a single module 
module.exports = {Thought, User};