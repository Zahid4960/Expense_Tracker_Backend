const UserModel = require('../model/user.model')
const LoginRegistrationDto = require('../dto/login-registration.dto')
const { encryptPassword } = require('../helper/auth.helper')


/**
 * function to check existance of user by email
 * @param {*} email
 * @returns {*} true || false
 */
exports.isUserExistOrNotByEmail = async (email) => {
    const user = await UserModel.findOne({ email: email })
    return user !== null
}


/**
 * function to create user
 * @param {*} payload
 */
exports.createUser = async (payload) => {
    const { email, password } = payload

    const registrationDto = new LoginRegistrationDto()
    registrationDto.email = email
    registrationDto.password = await encryptPassword(password)

    let user = await UserModel.create(registrationDto)

    const userId = user._id
    user.createdBy = userId
    user.updatedBy = userId
    user.save()
}
