const { AddressResponse } = require("../response/address.response")
const { convertIsoDateTimeToUTCDateTime } = require('../helper/common.helper')


/**
 * helper function to get formatted user wise addresses
 * @param addresses
 * @return {*[]} user addresses || []
 */
exports.getUserAddressesResponse = (addresses) => {
    if(addresses.length > 0) {
        addresses.map(item => {
            const addressesResponse = new AddressResponse()
            addressesResponse.id = item.id
            addressesResponse.address = item.address
            addressesResponse.country = item.country
            addressesResponse.city = item.city
            addressesResponse.state = item.state
            addressesResponse.postalCode = item.postalCode
            addressesResponse.isActive = item.isActive
            addressesResponse.createdAt = convertIsoDateTimeToUTCDateTime(item.createdAt)
        })
    }

    return addresses
}
