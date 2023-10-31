const { Schema } = require('mongoose')


/**
 * schema for addresses
 */
const addressSchema = new Schema({
    address: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String },
    postalCode: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now() },
    deletedAt: { type: Date }
})

module.exports = addressSchema
