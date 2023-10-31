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


/**
 * dto class for update address
 */
class UpdateAddressDto extends UserAddressDto{
    constructor(address,country, city, state, postalCode, isActive) {
        super(address,country, city, state, postalCode)
        this.isActive = isActive
    }
}

module.exports = {
    UserAddressDto,
    UpdateAddressDto
}
