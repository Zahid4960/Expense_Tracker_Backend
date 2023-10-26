const { SuccessResponse, ErrorResponse, ExceptionResponse } = require('../utility/response')
const { responseFormatter } = require('../utility/response-formatter')
const { userAddresses, userAddress } = require('../service/address.service')
const { getUserAddressesResponse } = require('../helper/address.helper')
const { UserAddressDto } = require('../dto/address.dto')


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
