const joi = require('joi')


const loginRegistrationValidationSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
})

module.exports = loginRegistrationValidationSchema
