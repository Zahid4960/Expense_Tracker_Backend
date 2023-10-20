const jwt = require('jsonwebtoken')
const { ErrorResponse } = require('../utility/response')
const { responseFormatter } = require('../utility/response-formatter')
const { getUserByEmail } = require('../repository/auth.repo')


/**
 * middleware to verify token provided at the api request header
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @return {*} error response || pass request to controller
 */
exports.verifyToken = (req, res, next) => {
    const authToken = req.headers.authorization

    if(!authToken){
        return responseFormatter(res, new ErrorResponse(401, 'No token provided!'))
    }

    let token = authToken.split(" ")[1]

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
    const token = req.headers.authorization.split(' ')[1]

    jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
        if(err){
            return responseFormatter(res, new ErrorResponse(401, err.message))
        }

        const user = await getUserByEmail(decodedToken?.email)

        if(user !== null && user.isEmailVerified === true){
            next()
        }else{
            return responseFormatter(res, new ErrorResponse(401, 'Your account is not verified yet. Please verify.'))
        }
    })
}
