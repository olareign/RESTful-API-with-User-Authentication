const customError = require('../errors')

const checkPermissions = (requestUser, resourceUserId) =>{
    // console.log(requestUser);
    console.log(resourceUserId.toString());
    if(requestUser.role === 'admin') return;
    if(requestUser.userId === resourceUserId.toString()) return;
    throw new customError.UnauthorizeError('Unauthorize Access to resources')
}

module.exports = {
    checkPermissions
}