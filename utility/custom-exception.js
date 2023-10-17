/**
 * class to throw custom exception with statusCode & message
 */
class CustomException extends Error{
    constructor(statusCode, message) {
        super(message)
        this.statusCode = statusCode
    }
}

module.exports = CustomException
