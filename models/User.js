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
    roles : {
        User: {
            type : Number,
            default : 2001
        },
        Moderator : Number,
        Admin:  Number, 
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User;