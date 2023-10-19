const jwt = require('jsonwebtoken')
const { ErrorResponse } = require('../utility/response')
const { responseFormatter } = require('../utility/response-formatter')


/**
 * middleware to verify token provided at the api request header
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
exports.verifyToken = (req, res, next) => {
    const authToken = req.headers.authorization

    if(!authToken){
        return responseFormatter(res, new ErrorResponse(401, 'No token provided!'))
    }

    let token = authToken.split(" ")[1]

    jwt.verify(token, process.env.JWT_SECRET, (err) => {
        if(err){
            return responseFormatter(res, new ErrorResponse(401, 'Invalid token provided or token expired!'))
        }

        next()
    })
}
