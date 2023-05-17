const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: String,
    password: String,
    team: String,
    degree: String,
})

module.exports = mongoose.model("user", UserSchema)