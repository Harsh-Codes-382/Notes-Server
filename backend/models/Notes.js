const mongoose = require('mongoose');
const { Schema } = mongoose;
const NotesSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,   // we are saving the notes to only that user no other user can access it because we given the user id
        ref: 'user'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        default: "General"
    },
    date: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('Notes', NotesSchema);