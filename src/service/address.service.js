const CustomException = require('../src/utility/custom-exception')
const {
    getUserById,
    getUserByFilters,
    updateUserByFilters
} = require('../repository/auth.repo')


/**
 * service function to get user wise addresses
 * @param {string} userId
 * @return {*} user addresses || [] || CustomException
 */
exports.userAddresses = async (userId) => {

    const user = await getUserById(userId)

    if(user === null){
        throw new CustomException(404, 'User not found!')
    }

    if(user.addresses?.length > 0){
        return user.addresses.filter(item => item.isActive === true)
    }

    return []
}


/**
 * service function to add user wise address
 * @param {string} userId
 * @param {*} payload
 * @return {*} CustomException || null
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


/**
 * service function to get user wise address wise address
 * @param {string} userId
 * @param {string} addressId
 * @return {*} CustomException || address
 */
exports.addressByAddressId = async (userId, addressId) => {
    const user = await getUserById(userId)

    if(user === null){
        throw new CustomException(404, 'User not found!')
    }

    const address = user.addresses.find(item => item.id === addressId)

    if(address === undefined){
        throw new CustomException(404, 'Address not found!')
    }

    return address
}


/**
 * service function to update address
 * @param {string} userId
 * @param {string} addressId
 * @param {*} payload
 * @return {*} exception || void
 */
exports.updateAddress = async (userId, addressId, payload) => {
    const filters = { '_id': userId, 'addresses._id': addressId }

    const user = await getUserByFilters(filters)

    if(user === null){
        throw new CustomException(404, 'User not found!')
    }

    const updatedAddress = {
        $set: {
            'addresses.$.address': payload.address,
            'addresses.$.country': payload.country,
            'addresses.$.city': payload.city,
            'addresses.$.state': payload.state,
            'addresses.$.postalCode': payload.postalCode,
            'addresses.$.isActive': payload.isActive
        }
    }

    await updateUserByFilters(filters, updatedAddress)
}


/**
 *
 * @param {string} userId
 * @param {string} addressId
 * @return {} exception || void
 */
exports.addressDelete = async (userId, addressId) => {
    const filters = { '_id': userId, 'addresses._id': addressId }

    const user = await getUserByFilters(filters)

    if(user === null){
        throw new CustomException(404, 'User not found!')
    }

    const deleteAddress = {
        $set: {
            'addresses.$.deletedAt': Date.now()
        }
    }

    await updateUserByFilters(filters, deleteAddress)
}
