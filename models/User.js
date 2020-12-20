const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    email:  {
        type: String,
        unique:true
    },
    name: String,
    sha:   String,
});

module.exports = mongoose.model('User',userSchema)
