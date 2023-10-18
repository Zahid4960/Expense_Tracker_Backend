const { responseFormatter } = require('../utility/response-formatter')
const { SuccessResponse, ErrorResponse, ExceptionResponse } = require('../utility/response')
const loginRegistrationValidationSchema = require('../validation/login-registration.validation')
const { registration, login } = require('../service/auth.service')


/**
 * controller to register user into the system
 * @param {*} req
 * @param {*} res
 * @return {*} SuccessResponse || ErrorResponse || ExceptionResponse
 */
exports.registration = async (req, res) => {
    try{
        const item = req.body

        const { error } = loginRegistrationValidationSchema.validate(item)

        if(error){
            return responseFormatter(res, new ErrorResponse(400, error.details[0].message))
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
 * @returns {*} SuccessResponse || ErrorResponse || ExceptionResponse
 */
exports.login = async (req, res) => {
    try{
        const item = req.body

        const { email, password } = item

        const { error } = loginRegistrationValidationSchema.validate({ email: email, password: password })

        if(error){
            return responseFormatter(res, new ErrorResponse(400, error.details[0].message))
        }

        const userPayload = await login(item)

        responseFormatter(res, new SuccessResponse(200, 'Login successful!', userPayload))
    }catch (e) {
        console.error(e)
        responseFormatter(res, new ExceptionResponse(e))
    }
}
