/**
 * dto class for registration
 */
class RegistrationDto {
    constructor(email, password) {
        this.email = email
        this.password = password
    }
}


/**
 * dto class for login
 */
class LoginDto extends RegistrationDto{
    constructor(email, password, isRemember) {
        super(email, password)
        this.isRemember = isRemember ?? false
    }
}


/**
 * dto class for otp
 */
class OtpDto {
    constructor(otp) {
        this.otp = otp
    }
}


/**
 * dto class for forgot password
 */
class ForgotPasswordDto {
    constructor(newPassword) {
        this.newPassword = newPassword
    }
}


/**
 * dto class for change password
 */
class ChangePasswordDto extends ForgotPasswordDto{
    constructor(oldPassword, newPassword) {
        super(newPassword)
        this.oldPassword = oldPassword
    }
}


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


/**
 * dto class for user profile update
 */
class UserProfileUpdateDto {
    constructor(firstName, lastName, userName, dob, gender) {
        this.firstName = firstName
        this.lastName = lastName
        this.userName = userName
        this.dob = dob
        this.gender = gender
    }
}

module.exports = {
    RegistrationDto,
    LoginDto,
    OtpDto,
    ForgotPasswordDto,
    ChangePasswordDto,
    UserDto,
    UserProfileUpdateDto
}
