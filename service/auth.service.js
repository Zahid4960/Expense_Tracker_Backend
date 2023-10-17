const { isUserExistOrNotByEmail } = require('../repository/auth.repo')
const UserModel = require('../model/user.model')


exports.registration = async (payload) => {
    if(! await isUserExistOrNotByEmail(payload.email)){
        UserModel.create(payload)
    }
}
