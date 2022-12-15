const mongoose = require('mongoose')
const Schema = mongoose.Schema


const userSchema = new Schema({

    username : {
        type : String,
        required : [true,"username is required"]
    },
    password : {
        type : String,
        required : [true, "Password is required"]
    },
    roles : [
        {
            type: String,
            default: "User"
        }
    ],
    
})

const User = mongoose.model('User', userSchema)

module.exports = User;