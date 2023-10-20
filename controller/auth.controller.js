const { responseFormatter } = require('../utility/response-formatter')
const { SuccessResponse, ErrorResponse, ExceptionResponse } = require('../utility/response')
const { loginRegistrationValidationSchema, userVerifyOtpValidationSchema } = require('../validation/user.validation')
const { registration, login, verifyUserViaOtp } = require('../service/auth.service')


/**
 * controller function to register user into the system
 * @param {*} req
 * @param {*} res
 * @return {*} SuccessResponse || ErrorResponse || ExceptionResponse
 */
exports.registrationPost = async (req, res) => {
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
 * controller function to login user into the system
 * @param {*} req
 * @param {*} res
 * @returns {*} SuccessResponse || ErrorResponse || ExceptionResponse
 */
exports.loginPost = async (req, res) => {
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


/**
 * controller function to verify user via otp
 * @param {*} req
 * @param {*} res
 * @return {*} SuccessResponse || ErrorResponse || ExceptionResponse
 */
exports.verifyUserViaOtpPost = async (req, res) => {
    try{
        const payload = req.body

        const { error } = userVerifyOtpValidationSchema.validate(payload)

        if(error){
            return responseFormatter(res, new ErrorResponse(400, error.details[0].message))
        }

        await verifyUserViaOtp(payload)

        responseFormatter(res, new SuccessResponse(200, 'User verification successful!'))
    }catch (e) {
        console.error(e)
        responseFormatter(res, new ExceptionResponse(e))
    }
}


exports.forgotPasswordPost = async (req, res) => {
    try{
        responseFormatter(res, new SuccessResponse(200, 'Password updated successfully!'))
    }catch (e) {
        console.error(e)
        responseFormatter(res, new ExceptionResponse(e))
    }
}
