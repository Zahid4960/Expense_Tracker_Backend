const joi = require('joi')


/**
 * validation schema for user login & registration
 */
exports.loginRegistrationValidationSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
})


/**
 * validation schema for user verification using otp
 */
exports.userVerifyOtpValidationSchema = joi.object({
    otp: joi.string().required()
})


/**
 * validation schema for forgot password
 */
exports.forgotPasswordValidationSchema = joi.object({
    newPassword: joi.string().required()
})


/**
 * validation schema for change password
 */
exports.changePasswordValidationSchema = joi.object({
    oldPassword: joi.string().required(),
    newPassword: joi.string().required()
})

