const { responseFormatter } = require('../utility/response-formatter')
const { SuccessResponse, ErrorResponse, ExceptionResponse } = require('../utility/response')
const { getTokenFromHeader } = require('../helper/auth.helper')
const { SuccessLoginPayload } = require('../payload/auth.payload')
const {
    RegistrationDto,
    LoginDto,
    OtpDto,
    ForgotPasswordDto,
    ChangePasswordDto
} = require('../dto/auth.dto')
const {
    registration,
    login,
    verifyUserViaOtp,
    forgotPassword,
    changePassword
} = require('../service/auth.service')
const {
    loginRegistrationValidationSchema,
    userVerifyOtpValidationSchema,
    forgotPasswordValidationSchema,
    changePasswordValidationSchema
} = require('../validation/user.validation')


/**
 * controller function to register user into the system
 * @param {*} req
 * @param {*} res
 * @return {*} SuccessResponse || ErrorResponse || ExceptionResponse
 */
exports.registrationPost = async (req, res) => {
    try{
        const { email, password } = req.body

        const registrationDto = new RegistrationDto()
        registrationDto.email = email
        registrationDto.password = password

        const { error } = loginRegistrationValidationSchema.validate(registrationDto)

        if(error){
            return responseFormatter(res, new ErrorResponse(400, error.details[0].message))
        }

        await registration(registrationDto)

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
        const { email, password, isRemember } = req.body

        const { error } = loginRegistrationValidationSchema.validate({ email, password })

        if(error){
            return responseFormatter(res, new ErrorResponse(400, error.details[0].message))
        }

        const loginDto = new LoginDto()
        loginDto.email = email
        loginDto.password = password
        loginDto.isRemember = isRemember

        const user = await login(loginDto)

        const payload = new SuccessLoginPayload()
        payload.id = user._id
        payload.firstName = user.firstName ?? null
        payload.email = user.email
        payload.isRemember = user.isRemember
        payload.token = user.token
        payload.tokenExpiresAt = user.tokenExpiresAt

        responseFormatter(res, new SuccessResponse(200, 'Login successful!', payload))
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
        const { otp } = req.body

        const otpDto = new OtpDto()
        otpDto.otp = otp

        const { error } = userVerifyOtpValidationSchema.validate(otpDto)

        if(error){
            return responseFormatter(res, new ErrorResponse(400, error.details[0].message))
        }

        const token = getTokenFromHeader(req)

        await verifyUserViaOtp(otpDto, token)

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
        const { newPassword } = req.body

        const dto = new ForgotPasswordDto()
        dto.newPassword = newPassword

        const { error } = forgotPasswordValidationSchema.validate(dto)

        if(error){
            return responseFormatter(res, new ErrorResponse(400, error.details[0].message))
        }

        const token = getTokenFromHeader(req)

        await forgotPassword(dto, token)

        responseFormatter(res, new SuccessResponse(200, 'Password updated successfully!'))
    }catch (e) {
        console.error(e)
        responseFormatter(res, new ExceptionResponse(e))
    }
}


/**
 * controller function for changing password
 * @param {*} req
 * @param {*} res
 * @return {*} success response || error response || exception response
 */
exports.changePasswordPost = async (req, res) => {
    try{
        const { oldPassword, newPassword } = req.body

        const dto = new ChangePasswordDto()
        dto.oldPassword = oldPassword
        dto.newPassword = newPassword

        const { error } = changePasswordValidationSchema.validate(dto)

        if(error){
            return responseFormatter(res, new ErrorResponse(400, error.details[0].message))
        }

        const token = getTokenFromHeader(req)

        await changePassword(dto, token)

        responseFormatter(res, new SuccessResponse(200, 'Password changed successfully!'))
    }catch (e) {
        console.error(e)
        responseFormatter(res, new ExceptionResponse(e))
    }
}
