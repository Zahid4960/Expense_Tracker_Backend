const { getUserById } = require('../repository/auth.repo')
const CustomException = require('../utility/custom-exception')


/**
 * service function to get user wise addresses
 * @param {string} userId
 * @return {*} user addresses || []
 */
exports.userAddresses = async (userId) => {
    const user = await getUserById(userId)

    if(user === null){
        throw new CustomException(404, 'User not found!')
    }

    return user.addresses
}
