const User = require('../model/user');
const {StatusCodes } = require('http-status-codes');
const customError = require('../errors');
const { createCookieWithToken } = require('../utils');
const bcrypt = require('bcryptjs');

const registerUser = async (req, res) => {
    const {username, password } = req.body;
    if(!username || !password){
        throw new customError.BadRequestError('Field can not be empty, kindly fill in credentials');
    };
    const user = await User.create( req.body );
    
    res.status(StatusCodes.CREATED).json({msg: 'Account successfully created.', userDetails: user });
};

const loginUser = async (req, res) => {
    const {username, password } = req.body;
    if(!username || !password){
        throw new customError.BadRequestError('Field can not be empty, kindly fill in credentials');
    }
    const user = await User.findOne({ username });
    if(!user){
        throw new customError.BadRequestError('Invalid Credentials');
    };

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      throw new UnauthenticatedError('Invalid Credentials');
    };

    const payload = { username: user.username, userId: user._id.toString(), role: user.role };
    console.log(payload);
    createCookieWithToken({res, user: payload});
    res.redirect(StatusCodes.CREATED,'localhost:5000/api/ums/dashboard');
};

const logoutUser = async (req, res) => {
    
    const propertyName = Object.keys(req.cookies)[0];
    res.cookie(propertyName, 'logout', {
            httpOnly: true,
            expires: new Date(Date.now())
        });
    res.clearCookie(propertyName) ;
    res.status(StatusCodes.OK).json('user logout successfully');
};



module.exports = {
    registerUser,
    loginUser,
    logoutUser
};