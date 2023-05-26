const mongoose = require("mongoose")
const Schema = mongoose.Schema

const CodeSchema = new Schema({
    name:String,
    text:String,
    images:Array,
    //documents:Array,
    answers:Array
})

module.exports = mongoose.model("code", CodeSchema)