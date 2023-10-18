/**
 * class for login & registration dto
 */
class LoginRegistrationDto {
    constructor(email, password) {
        this.email = email
        this.password = password
    }
}

module.exports = LoginRegistrationDto
