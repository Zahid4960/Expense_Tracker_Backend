const { responseFormatter } = require('../utility/response-formatter')
const { SuccessResponse, ExceptionResponse } = require('../utility/response')

exports.registration = async (req, res) => {
    try{
        responseFormatter(res, new SuccessResponse(200, 'Registration successful!'))
    }catch (e) {
        console.log(e)
        responseFormatter(res, new ExceptionResponse(e))
    }
}

exports.login = async (req, res) => {
    try{
        responseFormatter(res, new SuccessResponse(200, 'Login successful!'))
    }catch (e) {
        console.log(e)
        responseFormatter(res, new ExceptionResponse(e))
    }
}
