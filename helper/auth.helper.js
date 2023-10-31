const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { convertIsoDateTimeToUTCDateTime } = require('../helper/common.helper')
const { UserDetailsResponse, SuccessLoginResponse} = require('../response/auth.response')
const { AddressResponse } = require('../response/address.response')


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
 * helper function to get token from header
 * @param {*} req
 * @return {string | undefined} token || undefined
 */
exports.getTokenFromHeader = (req) => {
    return req.headers?.authorization?.split(' ')[1]
}


/**
 * helper function to get formatted response for success login
 * @param {*} user
 * @return {*} success login response
 */
exports.getSuccessLoginResponse = (user) => {
    const response = new SuccessLoginResponse()
    response.id = user._id
    response.firstName = user.firstName ?? null
    response.email = user.email
    response.isRemember = user.isRemember
    response.token = user.token
    response.tokenExpiresAt = user.tokenExpiresAt

    return response
}


/**
 * helper function to get formatted user details response
 * @param {*} user
 * @return {*} user details response
 */
exports.getUserDetailsResponse = (user) => {
    const { id, firstName, lastName, userName, dob, gender, email, addresses } = user

    const response = new UserDetailsResponse()
    response.id = id
    response.firstName = firstName ?? null
    response.lastName = lastName ?? null
    response.userName = userName ?? null
    response.dob = dob ?? null
    response.gender = gender
    response.email = email

    if(addresses.length > 0){
        addresses.map(item => {
            const addressesResponse = new AddressResponse()
            addressesResponse.id = item.id
            addressesResponse.address = item.address
            addressesResponse.country = item.country
            addressesResponse.city = item.city
            addressesResponse.state = item.state
            addressesResponse.postalCode = item.postalCode
            addressesResponse.isActive = item.isActive
            addressesResponse.createdAt = convertIsoDateTimeToUTCDateTime(item.createdAt)

            response.addresses = addressesResponse
        })

        response.addresses = addresses
    }
    else{
        response.addresses = []
    }

    return response
}

