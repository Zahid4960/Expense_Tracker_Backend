const { responseFormatter } = require('../utility/response-formatter')
const { SuccessResponse, ErrorResponse, ExceptionResponse } = require('../utility/response')
const loginRegistrationValidationSchema = require('../validation/login-registration.validation')
const { registration } = require('../service/auth.service')


/**
 * controller to register user into the system
 * @param {*} req 
 * @param {*} res  
 * @returns SuccessResponse || ErrorResponse || ExceptionResponse
 */
exports.registration = async (req, res) => {
    try{
        const item = req.body

        const { error } = loginRegistrationValidationSchema.validate(item)

        if(error){
            return responseFormatter(res, new ErrorResponse(400, error.details))
        }

        await registration(item)

        return responseFormatter(res, new SuccessResponse(200, 'Registration successful!'))
    
    }catch (e) {
        console.error(e)
        responseFormatter(res, new ExceptionResponse(e))
    }
}


/**
 * controller to login user into the system
 * @param {*} req 
 * @param {*} res 
 * @returns SuccessResponse || ErrorResponse || ExceptionResponse
 */
exports.login = async (req, res) => {
    try{
        responseFormatter(res, new SuccessResponse(200, 'Login successful!'))
    }catch (e) {
        console.error(e)
        responseFormatter(res, new ExceptionResponse(e))
    }
}
