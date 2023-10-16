/**
 * helper function for success response
 * @param res
 * @param statusCode
 * @param message
 * @param data
 */
exports.successResponse = (res, statusCode, message, data) => {
    res.status(statusCode).json({ status: 'success', message: message, data: data })
}


/**
 * helper function for error response
 * @param res
 * @param statsCode
 * @param message
 */
exports.errorResponse = (res, statsCode, message) => {
    res.status(statsCode).json({ status: 'error', message: message })
}


/**
 * helper function for exception response
 * @param res
 * @param err
 */
exports.exceptionResponse = (res, err) => {
    res.status(500).json({ status: 'exception', message: err.message, stack: err.stack })
}
