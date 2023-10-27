const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique:true,
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
})
// this will prevent from saving the same email of differnt user in mongodb because email has unique (true)
const user = new mongoose.model('User', UserSchema);
// user.createIndexes(); // we are not using it anymore because we are using findOne() func in auth.js
module.exports = user;
