const { Schema } = require('mongoose')


/**
 * schema for expense category
 */
const expenseCategorySchema = new Schema({
    categoryName: { type: String, required: true },
    categoryDescription: { type: String, required: true},
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now() }
})

module.exports = expenseCategorySchema
