const mongoose = require("mongoose")
const Schema = mongoose.Schema

const MeetingSchema = new Schema({
    name:String,
    userId:String,
    meetings:Array
})

module.exports = mongoose.model("meeting", MeetingSchema)