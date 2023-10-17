/**
 * function to format all the responses
 * @param res
 * @param exception
 */
exports.responseFormatter = (res, exception) => {
    res.status(exception.statusCode).json(exception)
}
