const UserModel = require('../model/user.model')


/**
 * function to check existance of user by email
 * @param {*} email 
 * @returns true || false
 */
exports.isUserExistOrNotByEmail = async (email) => {
    const user = await UserModel.findOne({ email: email })
    return user !== null
}
