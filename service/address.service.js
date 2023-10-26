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


/**
 * service function to add user wise address
 * @param {string} userId
 * @param {*} payload
 * @return {*}
 */
exports.userAddress = async (userId, payload) => {
    const user = await getUserById(userId)

    const { address, country, city, state, postalCode } = payload

    if(user === null){
        throw new CustomException(404, 'User not found!')
    }

    const addressObj = {
        address,
        country,
        city,
        state,
        postalCode
    }

    user.addresses.push(addressObj)
    await user.save()
}
