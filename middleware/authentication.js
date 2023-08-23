const CustomError = require('../errors')
const {isTokenValid} = require('../utils')

const authenticateUser = async (req, res, next) => {
    
    try {
        const cookiesObject = req.cookies    
        const token = Object.values(cookiesObject)[0];
        
        if(!token){
            throw new CustomError.UnauthenticatedError('Missing or invalid access token')
        }
        
        const {username, userId } = isTokenValid({ token })
        req.user = { username, userId }
        next()
    
    } catch (error) {
        throw new CustomError.UnauthenticatedError('Missing or invalid access token')
    }
}

module.exports = {
    authenticateUser
}