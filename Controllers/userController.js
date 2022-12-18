const User = require('../models/User')
const Wallet = require('../models/wallet')
const asyncHandler = require("express-async-handler")
const bcrypt = require('bcrypt')

// @desc Get all users
// @route GET/users
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password').lean()
    if(!users) {
        return res.status(400).json( {message : "No users found"})
    }
    res.json(users)
})
// @desc Create new user
// @route POST/users
// @access Private
const createNewUser = asyncHandler(async (req, res) => {
    const { username , password , roles } = req.body
    //Confirm data
    if(!username || !password){
        return res.status(400).json( {message : "Username and password are required"})
    }


    //check for duplicate names
    const duplicate = await User.findOne({ username }).lean().exec()

    if(duplicate){
        return res.status(409).json( {message : "Username is allready taken"})
    }

    //hash password
    const hashedPwd = await bcrypt.hash(password, 10)
    const userObject = {username,"password":hashedPwd, roles}

    //create & store newuser
    const user = await User.create(userObject)

    // no role was given
    if( !Array.isArray(roles) || !roles.length){
        res.status(201).json({ message : `New user ${username} created but role is set to default`})
    } else if(user){
        res.status(201).json({ message : `New user ${username} created`})
    } else {
        res.status(400).json({ message : "Invalid user data recieved"})
    }

})
// @desc Update a user
// @route PATCH /user
// @access Private
const updateUser = asyncHandler(async (req, res) => {
    const { id ,username ,roles,password } = req.body

    // confirm data
    if (!id || !username || !Array.isArray(roles) || !roles.length) {
        return res.status(400).json({ message : "All fields are required"})
    }

    const user = await User.findById(id).exec()

    if(!user) {
        return res.status(400).json({ message : "User not found in DB"})
    }

    // check for duplicate
    const duplicate = await User.findOne({username}).lean().exec()
    // allow updates to the original user
    if(duplicate && duplicate?._id.toString() !== id){
        return res.status(409).json({ message : "Username allready taken, try again"})
    }

    user.username = username
    user.roles = roles

    if(password){
        //hash pswd
        user.password = await bcrypt.hash(password,10)
    }
    const updatedUser = await user.save()

    res.json({message: `User ${updatedUser.username} was updated`})
    
    

})
// @desc Delete a user
// @route DELETE/user
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
    const {id} = req.body

    if(!id) {
        return res.status(400).json({ message : "User ID Required"})
    }

    const user = await User.findById(id).exec()

    if(!user){
        return res.status(400).json({ message : "User not found"})
    }

    const result = await user.deleteOne()

    const reply = `Username ${result.username} with ID: ${result._id} is deleted`

    res.json({message : reply})

})

// @desc Get a single user
// @route GET/user/:username
// @access Private
const getUser = async (req, res) => {
    console.log('function worked')
   return req.params.username
}





module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser,
    getUser
}
