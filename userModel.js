const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: { type: String },
    dob: { type: String },
    salary: { type: String },
    joiningDate: { type: String },
    relievingDate: { type: String },
    contact: { type: String },
    status: { type: Boolean }
   
});

const User = mongoose.model('users', userSchema)
module.exports = User