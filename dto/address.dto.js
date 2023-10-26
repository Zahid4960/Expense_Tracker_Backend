/**
 * dto class for user address
 */
class UserAddressDto {
    constructor(address,country, city, state, postalCode) {
        this.address = address
        this.country = country
        this.city = city
        this.state = state
        this.postalCode = postalCode
    }
}

module.exports = {
    UserAddressDto
}
