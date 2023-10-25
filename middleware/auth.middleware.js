const jwt = require('jsonwebtoken')
const { ErrorResponse } = require('../utility/response')
const { responseFormatter } = require('../utility/response-formatter')
const { getUserByEmail } = require('../repository/auth.repo')
const { getTokenFromHeader, comparePassword } = require('../helper/auth.helper')


/**
 * middleware to verify token provided at the api request header
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @return {*} error response || pass request to controller
 */
exports.verifyToken = (req, res, next) => {
    const token = getTokenFromHeader(req)

    if(!token){
        return responseFormatter(res, new ErrorResponse(401, 'No token provided!'))
    }

    jwt.verify(token, process.env.JWT_SECRET, (err) => {
        if(err){
            return responseFormatter(res, new ErrorResponse(401, err.message))
        }

        next()
    })
}


/**
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @return {*} error response || pass request to controller
 */
exports.verifyUserAccount = async (req, res, next) => {
    const token = getTokenFromHeader(req)

    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
        if(err){
            return responseFormatter(res, new ErrorResponse(401, err.message))
        }

        const user = await getUserByEmail(decodedToken?.email)

        if(user !== null){
            if(user.isEmailVerified){
                if(await comparePassword(decodedToken.password, user.password)){
                    next()
                }else{
                    return responseFormatter(res, new ErrorResponse(401, 'Invalid token!'))
                }
            }else{
                return responseFormatter(res, new ErrorResponse(401, 'Your account is not verified yet. Please verify!'))
            }
        }else{
            return responseFormatter(res, new ErrorResponse(404, 'User not found!'))
        }
    })
}
