const UserModel = require('../model/user.model')


exports.isUserExistOrNotByEmail = async (email) => {
    const user = await UserModel.findOne({ email: email })
    return user !== null
}
