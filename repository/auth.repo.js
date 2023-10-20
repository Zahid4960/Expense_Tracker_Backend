const UserModel = require('../model/user.model')
const UserDto = require('../dto/user.dto')
const { encryptPassword, generateOTP, generateToken, tokenExpiresAt } = require('../helper/auth.helper')


/**
 * repository function to check existence of user by email
 * @param {string} email
 * @returns {boolean} true || false
 */
exports.isUserExistOrNotByEmail = async (email) => {
    const user = await UserModel.findOne({ email: email })
    return user !== null
}


/**
 * repository function to get user information using email
 * @param {string} email
 * @return {*} user info
 */
exports.getUserByEmail = async (email) => {
    return await UserModel.findOne({ email: email })
}


/**
 * repository function to create user
 * @param {*} payload
 */
exports.createUser = async (payload) => {
    const { email, password } = payload

    const userDto = new UserDto()
    userDto.email = email
    userDto.password = await encryptPassword(password)
    userDto.otp = generateOTP()
    userDto.token = generateToken(payload, process.env.JWT_SECRET, false)
    userDto.tokenExpiresAt = tokenExpiresAt(userDto.token)

    let user = await UserModel.create(userDto)

    const userId = user._id
    user.createdBy = userId
    user.updatedBy = userId
    await user.save()
}
