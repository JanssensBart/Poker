const express = require('express')
const router = express.Router()
const userController = require('../../Controllers/userController')

router.route('/')
    .get(userController.getAllUsers)
    .post(userController.createNewUser)
    .patch(userController.updateUser)
    .delete(userController.deleteUser)

router.route('/:username').get(userController.getUser); 

module.exports = router
