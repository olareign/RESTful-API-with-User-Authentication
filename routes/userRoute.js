const express = require('express')
const router = express.Router()
const {authenticateUser} = require('../middleware/authentication')

const { 
    registerUser,
    loginUser,
    logoutUser
} = require('../controller/authUser')

const { 
    userDashboard,
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUserPassword,
    deleteUser,
    updateUser
} = require('../controller/userDashboard')

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/logout').get(logoutUser)

router.route('/dashboard').get( authenticateUser, userDashboard)
router.route('/dashboard/getall').get( authenticateUser, getAllUsers)
router.route('/dashboard/showme').get( authenticateUser, showCurrentUser)
router.route('/dashboard/').patch( authenticateUser, updateUserPassword)
router.route('/dashboard/').delete( authenticateUser, deleteUser)

router.route('/dashboard/:id').get( authenticateUser, getSingleUser)



module.exports = router