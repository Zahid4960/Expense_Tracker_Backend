const { Schema } = require('mongoose')


const addressSchema = new Schema({
    address: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String },
    postalCode: { type: String, required: true }
})

module.exports = addressSchema
