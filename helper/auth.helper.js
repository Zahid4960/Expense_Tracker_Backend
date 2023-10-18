const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


/**
 * helper function to convert plain password to encrypted password
 * @param {*} plainPassword
 * @return {*} encrypted password
 */
exports.encryptPassword = (plainPassword) => {
    return bcrypt.hash(plainPassword, parseInt(process.env.PASSWORD_SALT))
}


/**
 * helper function to generate OTP
 * @return {*} generated OTP
 */
exports.generateOTP = () => {
    return Math.floor(Math.random() * 10000)
}


/**
 * helper function to generate token
 * @param {*} payload
 * @param {*} jwtSecret
 * @param {*} isRemember
 * @return {*} jwt token
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
 * @param {*} token
 * @return {*} token expiry date & time
 */
exports.tokenExpiresAt = (token) => {
    const decodedToken = jwt.decode(token, { complete: true })

    if(decodedToken && decodedToken.payload?.exp){
        const expirationTimeInMilliseconds = decodedToken.payload?.exp * 1000
        return new Date(expirationTimeInMilliseconds)
    }
}
