/**
 * response class for addresses
 */
class AddressResponse {
    constructor(id, address, country, city, state, postalCode, isActive, createdAt) {
        this.id = id
        this.address = address
        this.country = country
        this.city = city
        this.state = state
        this.postalCode = postalCode
        this.isActive = isActive
        this.createdAt = createdAt
    }
}

module.exports = {
    AddressResponse
}
