const { convertIsoDateTimeToUTCDateTime } = require("../helper/common.helper")
const CustomException = require('../utility/custom-exception')
const {
    isUserExistOrNotByEmail,
    createUser,
    getUserByEmail,
    getUserInfoFromToken
} = require('../repository/auth.repo')
const {
    comparePassword,
    encryptPassword,
    generateToken,
    tokenExpiresAt
} = require('../helper/auth.helper')


/**
 * service function containing business logic of registration user
 * @param {*} payload || custom exception
 */
exports.registration = async (payload) => {
    const { email } = payload

    const isUserExist = await isUserExistOrNotByEmail(email)

    if(!isUserExist){
        return await createUser(payload)
    }
    throw new CustomException(409, 'User already exist')
}


/**
 * service function to handle login functionality
 * @param {*} payload
 * @return {*} formatted response || custom exception
 */
exports.login = async (payload) => {
    const { email, password, isRemember } = payload

    const user = await getUserByEmail(email)

    if(user !== null){
        const isMatched = await comparePassword(password, user.password)

        if(isMatched){
            const token = generateToken({ email: user.email, password }, isRemember)

            user.isRemember = isRemember
            user.token = token
            user.tokenExpiresAt = convertIsoDateTimeToUTCDateTime(tokenExpiresAt(token))
            await user.save()

            return user
        }
        throw new CustomException(409, 'Wrong password!')
    }
    throw new CustomException(404, 'User not found!')
}


/**
 * service function to handle user verification using otp
 * @param {*} payload
 * @param {string} token
 * @return {*} null || custom exception
 */
exports.verifyUserViaOtp = async (payload, token) => {
    const { otp } = payload

    const user = await getUserInfoFromToken(token)

    if(user !== null){
        if(user.otp === otp){
            user.isEmailVerified = true
            user.emailVerifiedAt = Date.now()
            user.updatedAt = Date.now()
            user.updatedBy = user._id
            await user.save()

            return
        }
        throw new CustomException(409, 'Invalid otp!')
    }
    throw new CustomException(404, 'User not found!')
}


/**
 * service function to update password due to forgot password
 * @param {*} payload
 *  * @param {string} token
 * @return {*} null || custom exception
 */
exports.forgotPassword = async (payload, token) => {
    const { newPassword } = payload

    const user = await getUserInfoFromToken(token)

    if(user !== null){
        user.password = await encryptPassword(newPassword)
        user.token = generateToken({ email: user.email, password: newPassword }, user.isRemember)
        user.updatedAt = Date.now()
        user.updatedBy = user._id
        await user.save()

        return
    }
    throw new CustomException(404, 'User not found!')
}


/**
 * service function to change password
 * @param {*} payload
 * @param {string} token
 * @return {*} null || custom exception
 */
exports.changePassword = async (payload, token) => {
    const { oldPassword, newPassword } = payload

    const user = await getUserInfoFromToken(token)

    if(user !== null){
        if(await comparePassword(oldPassword, user.password)){
            if(oldPassword !== newPassword){
                user.password = await encryptPassword(newPassword)
                user.token = generateToken({ email: user.email, password: newPassword }, user.isRemember)
                user.updatedAt = Date.now()
                user.updatedBy = user._id
                await user.save()
                return
            }
            throw new CustomException(409, 'Old password & new password can not same!')
        }
        throw new CustomException(409, 'Old password do not match!')
    }
    throw new CustomException(404, 'User not found with this email!')
}
