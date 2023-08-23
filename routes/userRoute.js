const express = require('express')
const router = express.Router()
const {authenticateUser} = require('../middleware/authentication')

const { registerUser, loginUser, logoutUser } = require('../controller/authUser')
const { userDashboard } = require('../controller/userDashboard')

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/dashboard').get( authenticateUser, userDashboard)
router.route('/logout').get(logoutUser)

module.exports = router