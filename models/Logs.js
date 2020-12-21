const mongoose = require("mongoose")
const { Schema } = mongoose

const logSchema = new Schema({
    payload:  String,
    path: String,
    date: { type: Date, default: Date.now },
    userType: Number,
    success: { type : Boolean, default: false}
});

module.exports = mongoose.model('Log',logSchema)
