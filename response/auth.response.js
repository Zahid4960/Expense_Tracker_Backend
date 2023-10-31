/**
 * response class for success login
 */
class SuccessLoginResponse {
    constructor(id, firstName, email, isRemember, token, tokenExpiresAt) {
        this.id = id
        this.firstName = firstName
        this.email = email
        this.isRemember =isRemember
        this.token = token
        this.tokenExpiresAt = tokenExpiresAt
    }
}


/**
 * response class for user details
 */
class UserDetailsResponse extends SuccessLoginResponse{
    constructor(id, firstName, lastName, userName, dob, email, gender, addresses) {
        super(id, firstName, email)
        this.lastName = lastName
        this.userName = userName
        this.dob = dob
        this.gender = gender
        this.addresses = addresses
    }
}


module.exports = {
    SuccessLoginResponse,
    UserDetailsResponse
}
