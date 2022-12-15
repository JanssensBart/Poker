const mongoose = require('mongoose');
const User = require('./User');
const  Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema;

const walletSchema = new Schema({
 
    walletFrom : {
        type : ObjectId,
        ref : "User"
    }
})

const Wallet = mongoose.model('wallet', walletSchema)

module.exports = Wallet;