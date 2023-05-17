const mongoose = require("mongoose")

module.exports = () => {

    mongoose.connect(`mongodb+srv://${process.env.DBUSER}:${process.env.DBPASSWORD}@cluster0.nsaztd9.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`)
    mongoose.connection.on('open', () => {
        console.log('MongoDB: Connected');
    })

};