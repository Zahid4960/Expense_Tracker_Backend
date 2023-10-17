/**
 * class for success response
 */
class SuccessResponse {
    constructor(statusCode, message, data) {
        this.statusCode = statusCode
        this.status = 'success'
        this.message = message
        this.data = data
    }
}


/**
 * class for error response
 */
class ErrorResponse extends SuccessResponse {
    constructor(statusCode, message) {
        super(statusCode, message)
        this.status = 'exception'
    }
}


/**
 * class for exception response
 */
class ExceptionResponse {
    constructor(err) {
        this.statusCode = err.statusCode || 500
        this.status = 'exception'
        this.message = err.message
        this.stack = err.stack || null
    }
}

module.exports = { SuccessResponse, ErrorResponse, ExceptionResponse }
