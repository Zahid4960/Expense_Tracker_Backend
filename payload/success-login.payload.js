/**
 * class for success login payload
 */
class SuccessLoginPayload {
    constructor(id, firstName, email, isRemember, token, tokenExpiresAt) {
        this.id = id
        this.firstName = firstName
        this.email = email
        this.isRemember =isRemember
        this.token = token
        this.tokenExpiresAt = tokenExpiresAt
    }
}

module.exports = SuccessLoginPayload
