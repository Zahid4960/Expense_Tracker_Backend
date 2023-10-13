/**
 * helper function for success response
 * @param res
 * @param statusCode
 * @param message
 * @param data
 * @return {*} returns success response
 */
exports.successResponse = (res, statusCode, message, data) => {
    return res.status(statusCode).json({ status: 'success', message: message, data: data })
}


/**
 * helper function for error response
 * @param res
 * @param statsCode
 * @param message
 * @return {*} returns error response
 */
exports.errorResponse = (res, statsCode, message) => {
    return res.status(statsCode).json({ status: 'error', message: message })
}


/**
 * helper function for exception response
 * @param res
 * @param err
 * @return {*} returns exception response
 */
exports.exceptionResponse = (res, err) => {
    return res.status(500).json({ status: 'exception', message: err.message, stack: err.stack })
}
