const { responseFormatter } = require('../utility/response-formatter')
const { SuccessResponse, ErrorResponse, ExceptionResponse } = require('../utility/response')
const { registration, login, verifyUserViaOtp, forgotPassword } = require('../service/auth.service')
const {
    loginRegistrationValidationSchema,
    userVerifyOtpValidationSchema,
    forgotPasswordValidationSchema
} = require('../validation/user.validation')


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


/**
 * controller function to update password due to forgot password
 * @param {*} req
 * @param {*} res
 * @return {*} success response || error response || exception response
 */
exports.forgotPasswordPost = async (req, res) => {
    try{
        const payload = req.body

        const { error } = forgotPasswordValidationSchema.validate(payload)

        if(error){
            return responseFormatter(res, new ErrorResponse(400, error.details[0].message))
        }

        await forgotPassword(payload)

        responseFormatter(res, new SuccessResponse(200, 'Password updated successfully!'))
    }catch (e) {
        console.error(e)
        responseFormatter(res, new ExceptionResponse(e))
    }
}
