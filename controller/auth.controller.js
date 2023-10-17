const { responseFormatter } = require('../utility/response-formatter')
const { SuccessResponse, ErrorResponse, ExceptionResponse } = require('../utility/response')
const loginRegistrationValidationSchema = require('../validation/login-registration.validation')
const LoginRegistrationDto = require('../dto/login-registration.dto')
const { registration } = require('../service/auth.service')

exports.registration = async (req, res) => {
    try{
        const item = req.body

        const { error } = loginRegistrationValidationSchema.validate(item)

        if(error){
            return responseFormatter(res, new ErrorResponse(400, error.details))
        }

        const registrationDto = new LoginRegistrationDto()
        registrationDto.email = item.email
        registrationDto.password = item.password

        await registration(registrationDto)

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
