const { Schema } = require('mongoose')


const expenseCategorySchema = new Schema({
    categoryName: { type: String, required: true },
    description: { type: String, required: true},
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now() }
})

module.exports = expenseCategorySchema
