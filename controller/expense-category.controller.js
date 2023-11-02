const { responseFormatter } = require('../utility/response-formatter')
const { SuccessResponse, ErrorResponse, ExceptionResponse } = require('../utility/response')
const { AddExpenseCategoryDto } = require('../dto/expense-category.dto')
const { formattedExpenseCategories } = require('../helper/expense-category.helper')
const { addExpenseCategoryValidationSchema } = require('../validation/expense-category.validation')
const { expenseCategories, addExpenseCategory, expenseCategoryDetails } = require('../service/expense-category.service')


/**
 * controller function to get expense categories
 * @param {*} req
 * @param {*} res
 * @return {*} SuccessResponse || ErrorResponse || ExceptionResponse
 */
exports.expenseCategoriesGet = async (req, res) => {
    try {
        const userId = req.params.userId

        const expCategories = await expenseCategories(userId)

        const formattedResponse = await formattedExpenseCategories(expCategories)

        responseFormatter(res, new SuccessResponse(200, 'Expense categories found!', formattedResponse))
    }catch (e) {
        console.error(e)
        responseFormatter(res, new ExceptionResponse(e))
    }
}


/**
 * controller function to add user expense category
 * @param {*} req
 * @param {*} res
 * @return {Object}
 */
exports.addExpenseCategoriesPost = async (req, res) => {
    try {
        const userId = req.params.userId

        const { categoryName, categoryDescription } = req.body

        const dataToAdd = new AddExpenseCategoryDto(categoryName, categoryDescription)

        const { error } = addExpenseCategoryValidationSchema.validate(dataToAdd)

        if(error){
            responseFormatter(res, new ErrorResponse(400, error.details[0].message))
        }

        await addExpenseCategory(userId, dataToAdd)

        responseFormatter(res, new SuccessResponse(200, 'Expense categories added successfully!'))
    }catch (e) {
        console.error(e)
        responseFormatter(res, new ExceptionResponse(e))
    }
}


/**
 * controller function to get details of expense category
 * @param {*} req
 * @param {*} res
 * @return {Object}
 */
exports.expenseCategoryDetailsGet = async (req, res) => {
    try {
        const userId = req.params.userId
        const expenseCategoryId = req.params.expenseCategoryId

        const data = await expenseCategoryDetails(userId, expenseCategoryId)

        const formattedResponse = await formattedExpenseCategories(data)

        responseFormatter(res, new SuccessResponse(200, 'Expense category found!', formattedResponse))
    }catch (e) {
        console.error(e)
        responseFormatter(res, new ExceptionResponse(e))
    }
}
