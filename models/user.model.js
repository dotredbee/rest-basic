const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')
const connection = mongoose.createConnection(process.env.MONGO_URI)
autoIncrement.initialize(connection)


const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true,
    }
})