const User = require('../model/user')
const {StatusCodes } = require('http-status-codes')
const customError = require('../errors')
const {checkPermissions} = require('../utils')

const userDashboard = async (req, res) => {
    const { username } = req.user
    res.status(StatusCodes.OK).send(`Welcome to your dasboard, ${username}`)
}

const getAllUsers = async (req, res) => {
    checkPermissions(req.user, req.user.role)
    const usersDetails = await User.find({ role: 'user'}).select('-password');
    if(!usersDetails){
        throw new customError.NotFoundError('There no users with the role: user')
    }
    res.status(StatusCodes.OK).json({usersDetails, count: usersDetails.length})
}

const getSingleUser = async (req, res) => {
    const { id:userId }= req.params
    if(!req.params){
        res.status(StatusCodes.BAD_REQUEST).json('Empty params field')
    }
    const userDetails = await User.findById({_id: userId}).select('-password')
    if(!userDetails){
        throw new customError.NotFoundError('There no users with the params')
    }
    if(userDetails.role === 'admin'){
        throw new customError.UnauthorizedError('You can not view a fellow admin details')
    }
    checkPermissions(req.user, userDetails._id)
    res.status(StatusCodes.OK).json({userDetails})
}

const showCurrentUser = async (req, res) => {
    res.status(StatusCodes.OK).json({ user: req.user })
}

const updateUserPassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body
    if(!oldPassword || !newPassword){
        res.status(StatusCodes.BAD_REQUEST).json('Do not leave field Empty')
    }
    const {userId} = req.user
    console.log(userId);
    const user = await User.findById({ _id: userId })
    if(!user){
        throw new customError.NotFoundError('No user with the id found')
    }
    console.log(user.password);
    const isMatch = await user.comparePassword(oldPassword)
    if(!isMatch){
        res.status(StatusCodes.UNAUTHORIZED).json('Do not leave field Empty')
    }
    user.password = newPassword
    await user.save()
    res.status(StatusCodes.OK).json({msg: 'Success! Password Updated'})
}

const deleteUser = async (req, res) => {
    const { userID } = req.body
    if(!userID){
        res.status(StatusCodes.BAD_REQUEST).json('Do not leave field Empty')
    }
    checkPermissions(req.user, userID)
    
    const checkUserRole = await User.findOne({ _id: userID })
    
    if(checkUserRole.role === 'admin'){
        throw new customError.UnauthorizedError('You can not delete a fellow admin account')
    }
    const user = await User.findByIdAndDelete({_id: userID})
    if(!user){
        throw new customError.NotFoundError(`No user with the Id: ${userID}`)
    }
    res.status(StatusCodes.OK).json('user deleted successfully')
}

module.exports = {
    userDashboard,
    getAllUsers,
    getSingleUser,
    showCurrentUser,
    updateUserPassword,
    deleteUser,
}