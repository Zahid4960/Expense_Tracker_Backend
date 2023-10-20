/**
 * dto class for user
 */
class UserDto {
    constructor(
        firstName,
        lastName,
        userName,
        email,
        password,
        dob,
        addresses,
        expenseCategories,
        otp,
        isEmailVerified,
        emailVerifiedAt,
        token,
        tokenExpiresAt,
        isRemember
    ) {
        this.firstName = firstName
        this.lastName = lastName
        this.userName = userName
        this.email = email
        this.password = password
        this.dob = dob
        this.addresses = addresses
        this.expenseCategories = expenseCategories
        this.otp = otp
        this.isEmailVerified = isEmailVerified
        this.emailVerifiedAt = emailVerifiedAt
        this.token = token
        this.tokenExpiresAt = tokenExpiresAt
        this.isRemember = isRemember
    }
}

module.exports = UserDto
