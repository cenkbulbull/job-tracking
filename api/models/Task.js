const mongoose = require("mongoose")
const Schema = mongoose.Schema

const TaskSchema = new Schema({
    name:String,
    text:String,
    status:Boolean
})

module.exports = mongoose.model("task", TaskSchema)