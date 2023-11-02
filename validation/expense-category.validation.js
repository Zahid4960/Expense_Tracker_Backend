const joi = require('joi')


/**
 * validation schema for adding new expense category
 */
exports.addExpenseCategoryValidationSchema = joi.object({
    categoryName: joi.string().required(),
    categoryDescription: joi.string().required()
})
