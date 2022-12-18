const User = require('../models/User')
const bcrypt = require('bcrypt');

const handleNewUser = async(req,res) => {
    const {user, pwd} = req.body

    if(!user || !pwd) res.status(400).json({ 'message' : 'Username and password are required' });

    // check if username allready excist (no duplicates!)
    const duplicate = await User.findOne( {username: user}).exec();

    if(duplicate) return res.status(409).json( { 'message' : 'Username is taken, try something else'} ) // code 409 = conflict

    try {
        //encrypt user pwd
        const hashedpwd = await bcrypt.hash( pwd , 10) // 10 = salt, see docs : https://en.wikipedia.org/wiki/Bcrypt#Description

        //create & save new user to db
        const result = await User.create({
            'username' : user,
            'password' : hashedpwd
        });

        console.log(result)

        // send response to frontend
        res.status(201).json({ 'succes' : `New user ${user} was created!` })


    } catch (error) { 
        res.status(500).json({ 'error message' : error.message})
    }
}


module.exports = { handleNewUser  }