const { isUserExistOrNotByEmail, createUser } = require('../repository/auth.repo')
const CustomException = require('../utility/custom-exception')
const UserModel = require('../model/user.model')


/**
 * service function containing business logic of registration user
 * @param {*} payload
 */
exports.registration = async (payload) => {
    const { email } = payload

    const isUserExist = await isUserExistOrNotByEmail(email)

    if(!isUserExist){
        await createUser(payload)
    }else{
        throw new CustomException(409, 'User already exist')
    }
}
