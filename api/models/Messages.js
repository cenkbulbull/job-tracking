const mongoose = require("mongoose")
const Schema = mongoose.Schema

const MessageSchema = new Schema({
    name:String,
    userId:String,
    messages:Array
})

module.exports = mongoose.model("message", MessageSchema)