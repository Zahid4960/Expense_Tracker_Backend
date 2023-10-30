const { SuccessResponse, ErrorResponse, ExceptionResponse } = require('../utility/response')
const { responseFormatter } = require('../utility/response-formatter')
const { getUserAddressesResponse } = require('../helper/address.helper')
const { UserAddressDto, UpdateAddressDto } = require('../dto/address.dto')
const {
    userAddresses,
    userAddress,
    addressByAddressId,
    updateAddress
} = require('../service/address.service')


/**
 * controller function to get user addresses
 * @param {*} req
 * @param {*} res
 * @return {*} SuccessResponse || ErrorResponse || ExceptionResponse
 */
exports.userAddressesGet = async (req, res) => {
    try {
        const userId = req.params.userId

        const addresses = await userAddresses(userId)

        const response = getUserAddressesResponse(addresses)

        responseFormatter(res, new SuccessResponse(200, 'User addresses found!', response))
    }catch (e) {
        console.error(e)
        responseFormatter(res, new ExceptionResponse(e))
    }
}


/**
 * controller function to add user wise address
 * @param {*} req
 * @param {*} res
 * @return {*} SuccessResponse || ErrorResponse || ExceptionResponse
 */
exports.userAddressesPost = async (req, res) => {
    try{
        const userId = req.params.userId

        const { address, country, city, state, postalCode } = req.body

        const dto = new UserAddressDto()
        dto.address = address
        dto.country = country
        dto.city = city
        dto.state = state
        dto.postalCode = postalCode

        await userAddress(userId, dto)

        responseFormatter(res, new SuccessResponse(200, 'User addresses added successfully!'))
    }catch (e) {
        console.error(e)
        responseFormatter(res, new ExceptionResponse(e))
    }
}


/**
 * controller function to get user wise address wise address
 * @param {*} req
 * @param {*} res
 * @return {*} SuccessResponse || ErrorResponse || ExceptionResponse
 */
exports.addressByAddressIdGet = async (req, res) => {
    try{
        const { userId, addressId } = req.params

        const address = await addressByAddressId(userId, addressId)

        responseFormatter(res, new SuccessResponse(200, 'Address found!', address))
    }catch (e) {
        console.error(e)
        responseFormatter(res, new ExceptionResponse(e))
    }
}


exports.updateAddressPatch = async (req, res) => {
    try{
        const { userId, addressId } = req.params

        const { address, country, city, state, postalCode, isActive } = req.body

        const dto = new UpdateAddressDto(address, country, city, state, postalCode, isActive)

        await updateAddress(userId, addressId, dto)

        responseFormatter(res, new SuccessResponse(200, 'Address updated successfully!'))
    }catch (e) {
        console.error(e)
        responseFormatter(res, new ExceptionResponse(e))
    }
}
