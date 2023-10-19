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
    email: joi.string().email().required(),
    otp: joi.number().required()
})

