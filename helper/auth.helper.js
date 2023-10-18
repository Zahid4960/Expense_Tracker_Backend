const bcrypt = require('bcrypt')


/**
 * helper function to convert plain password to encrypted password
 * @param {*} plainPassword
 * @return {*} encrypted password
 */
exports.encryptPassword = (plainPassword) => {
    return bcrypt.hash(plainPassword, parseInt(process.env.PASSWORD_SALT))
}
