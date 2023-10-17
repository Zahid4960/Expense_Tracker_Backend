const { isUserExistOrNotByEmail } = require('../repository/auth.repo')
const CustomException = require('../utility/custom-exception')
const UserModel = require('../model/user.model')


/**
 * service function conatining business logic of registartion user
 * @param {*} payload 
 */
exports.registration = async (payload) => {
    const { email, password } = payload

    const isUserExist = await isUserExistOrNotByEmail(email)

    if(!isUserExist){
        await UserModel.create(payload)
    }else{
        throw new CustomException(409, 'User already exist')
    }
}
