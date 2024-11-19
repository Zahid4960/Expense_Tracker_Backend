const joi = require('joi')


/**
 * validation schema for adding new expense category
 */
exports.addExpenseCategoryValidationSchema = joi.object({
    categoryName: joi.string().required(),
    categoryDescription: joi.string().required()
})


/**
 * validation schema to update expense category
 */
exports.updateExpenseCategoryValidationSchema = joi.object({
    categoryName: joi.string().required(),
    categoryDescription: joi.string().required(),
    isActive: joi.boolean().required()
})
