const { isUserExistOrNotByEmail, createUser, getUserByEmail } = require('../repository/auth.repo')
const { comparePassword, formattedSuccessLoginResponse } = require('../helper/auth.helper')
const CustomException = require('../utility/custom-exception')


/**
 * service function containing business logic of registration user
 * @param {*} payload
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
 * @return {*} formatted response
 */
exports.login = async (payload) => {
    const { email, password, isRemember } = payload

    const user = await getUserByEmail(email)

    if(user !== null){
        const isMatched = await comparePassword(password, user.password)

        if(isMatched){
            const formattedRes = await formattedSuccessLoginResponse(user, email, password, isRemember)

            user.isRemember = isRemember
            user.token = formattedRes.token
            user.tokenExpiresAt = formattedRes.tokenExpiresAt
            user.save()

            return formattedRes
        }
        throw new CustomException(409, 'Invalid password!')
    }
    throw new CustomException(404, 'User not found!')
}
