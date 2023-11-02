const { responseFormatter } = require('../utility/response-formatter')
const { SuccessResponse, ErrorResponse, ExceptionResponse } = require('../utility/response')
const { expenseCategories } = require('../service/expense-category.service')
const { formattedExpenseCategories } = require('../helper/expense-category.helper')


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
