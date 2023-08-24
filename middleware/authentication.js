const CustomError = require('../errors')
const {isTokenValid} = require('../utils')

const authenticateUser = async (req, res, next) => {
    
    try {
        const cookiesObject = req.cookies    
        const token = Object.values(cookiesObject)[0];
        
        if(!token){
            throw new CustomError.UnauthenticatedError('Missing or invalid access token')
        }
        
        const {username, userId, role } = isTokenValid({ token })
        req.user = { username, userId, role }
        next()
    
    } catch (error) {
        throw new CustomError.UnauthenticatedError('Missing or invalid access token')
    }
}

const unauthorizePermission = (...roles) => {
    return (req, res, next ) => {
        if(!roles.includes(req.user.role)){
        throw new CustomError.UnauthorizeError('Unauthorize Access to this site')
    }
    next();
    }
}
module.exports = {
    authenticateUser,
    unauthorizePermission 
}