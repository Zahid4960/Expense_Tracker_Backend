const UserModel = require('../model/user.model')
const { encryptPassword, generateOTP, generateToken, tokenExpiresAt } = require('../helper/auth.helper')
const jwt = require("jsonwebtoken")


/**
 * repository function to check existence of user by email
 * @param {string} email
 * @returns {boolean} true || false
 */
exports.isUserExistOrNotByEmail = async (email) => {
    const user = await UserModel.findOne({ email: email, deletedAt: null })
    return user !== null
}


/**
 * repository function to get user information using email
 * @param {string} email
 * @return {*} user info
 */
exports.getUserByEmail = async (email) => {
    return await UserModel.findOne({ email: email, deletedAt: null })
}


/**
 * repository function to update user profile
 * @param {string} userId
 * @return {*} user info of that specific user id
 */
exports.getUserById = async (userId) => {
    return await UserModel.findOne({ _id: userId, deletedAt: null })
}


/**
 * repository function to create user
 * @param {*} payload
 */
exports.createUser = async (payload) => {
    const { email, password } = payload

    const token = generateToken(payload)

    const userObj = {
        email: email,
        password: await encryptPassword(password),
        otp: generateOTP(),
        token: token,
        tokenExpiresAt: tokenExpiresAt(token)
    }

    let user = await UserModel.create(userObj)

    const userId = user._id
    user.createdBy = userId
    user.updatedBy = userId
    await user.save()
}



/**
 * repository function to get user info form token
 * @param {string} token
 * @return {*} user information || null
 */
exports.getUserInfoFromToken = async (token) => {
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET)

    if(decodedToken){
        return await this.getUserByEmail(decodedToken.email)
    }

    return null
}
