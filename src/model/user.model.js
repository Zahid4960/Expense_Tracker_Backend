const { mongoose, Schema } = require("mongoose")
const address = require('../schema/address.schema')
const expenseCategory = require('../schema/expense-category.schema')
const commonSchema = require('../schema/common.schema')


/**
 * model for user
 */
const userSchema = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    userName: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    dob: { type: String },
    gender: { type: String, enum: ['Male', 'Female'], default: 'Male' },
    addresses: [ address ],
    expenseCategories: [ expenseCategory ],
    otp: { type: String, required: true },
    isEmailVerified: { type: Boolean, default: false },
    emailVerifiedAt: { type: Date },
    token: { type: String, required: true },
    tokenExpiresAt: { type: Date, required: true },
    isRemember: { type: Boolean, default: false },
    ...commonSchema.obj
})

module.exports = User = mongoose.model('User', userSchema)
