const User = require('../model/user')
const {StatusCodes } = require('http-status-codes')
const customError = require('../errors')

const userDashboard = async (req, res) => {
    const { username } = req.user
    res.status(StatusCodes.OK).send(`Welcome to your dasboard, ${username}`)
}

module.exports = {
    userDashboard
}