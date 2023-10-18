const UserModel = require('../model/user.model')
const UserDto = require('../dto/user.dto')
const { encryptPassword, generateOTP, generateToken, tokenExpiresAt } = require('../helper/auth.helper')


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

    const userDto = new UserDto()
    userDto.email = email
    userDto.password = await encryptPassword(password)
    userDto.otp = await generateOTP()
    userDto.token = await generateToken(payload, process.env.JWT_SECRET, false)
    userDto.tokenExpiresAt = await tokenExpiresAt(userDto.token)

    let user = await UserModel.create(userDto)

    const userId = user._id
    user.createdBy = userId
    user.updatedBy = userId
    user.save()
}
