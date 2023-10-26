const { SuccessResponse, ErrorResponse, ExceptionResponse } = require('../utility/response')
const { responseFormatter } = require('../utility/response-formatter')
const { userAddresses } = require('../service/address.service')
const { getUserAddressesResponse } = require('../helper/address.helper')


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
