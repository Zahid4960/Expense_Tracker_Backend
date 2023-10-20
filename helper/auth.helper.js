const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SuccessLoginPayload = require("../payload/success-login.payload")
const { convertIsoDateTimeToUTCDateTime } = require('./common.helper')


/**
 * helper function to convert plain password to encrypted password
 * @param {string} plainPassword
 * @return {string} encrypted password
 */
exports.encryptPassword = async (plainPassword) => {
    return await bcrypt.hash(plainPassword, parseInt(process.env.PASSWORD_SALT))
}


/**
 * helper function to compare plain password & encrypted password
 * @param {string} plainPassword
 * @param {string} encryptPassword
 * @return {boolean} true || false
 */
exports.comparePassword = (plainPassword, encryptPassword) => {
    return bcrypt.compare(plainPassword, encryptPassword)
}


/**
 * helper function to generate OTP
 * @return {number} generated OTP
 */
exports.generateOTP = () => {
    return Math.floor(Math.random() * 10000)
}


/**
 * helper function to generate token
 * @param {*} payload
 * @param {string} jwtSecret
 * @param {boolean} isRemember
 * @return {string} jwt token
 */
exports.generateToken = (payload, jwtSecret, isRemember = false) => {
    const { email, password } = payload

    return jwt.sign(
        { email: email, password: password },
        jwtSecret,
        isRemember === true ? { expiresIn: '24h'} : { expiresIn: '1h'}
    )
}


/**
 * helper function to get token expiry date time
 * @param {string} token
 * @return {*} token expiry date & time
 */
exports.tokenExpiresAt = (token) => {
    const decodedToken = jwt.decode(token, { complete: true })

    if(decodedToken && decodedToken.payload?.exp){
        const expirationTimeInMilliseconds = decodedToken.payload?.exp * 1000
        return new Date(expirationTimeInMilliseconds)
    }
}


/**
 * helper function to send back formatted success login response
 * @param {*} user
 * @param {string} email
 * @param {string} password
 * @param {boolean} isRemember
 * @return {*} formatted success login response
 */
exports.formattedSuccessLoginResponse = (user, email, password, isRemember ) => {
    const payload = new SuccessLoginPayload()
    payload.id = user._id
    payload.email = user.email
    payload.firstName = user.firstName ?? null
    payload.isRemember = isRemember
    payload.token = this.generateToken({ email: user.email, password: password}, process.env.JWT_SECRET, isRemember)
    payload.tokenExpiresAt = convertIsoDateTimeToUTCDateTime(this.tokenExpiresAt(payload.token))

    return payload
}

