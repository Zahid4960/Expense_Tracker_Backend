const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


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
 * @return {string} generated OTP
 */
exports.generateOTP = () => {
    const randomNumber = Math.floor(Math.random() * 10000)
    return randomNumber.toString().padStart(4, '0')
}


/**
 * helper function to generate token
 * @param {*} payload
 * @param {boolean} isRemember
 * @return {string} jwt token
 */
exports.generateToken = (payload, isRemember = false) => {
    const { email, password } = payload

    return jwt.sign(
        { email: email, password: password },
        process.env.JWT_SECRET,
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
 *
 * @param {*} req
 * @return {string | undefined} token || undefined
 */
exports.getTokenFromHeader = (req) => {
    return req.headers?.authorization?.split(' ')[1]
}

