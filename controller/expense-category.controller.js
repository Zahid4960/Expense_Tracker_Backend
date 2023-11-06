const { responseFormatter } = require('../utility/response-formatter')
const { SuccessResponse, ErrorResponse, ExceptionResponse } = require('../utility/response')
const { AddExpenseCategoryDto, UpdateExpenseCategoryDto } = require('../dto/expense-category.dto')
const { formattedExpenseCategories } = require('../helper/expense-category.helper')
const {
    addExpenseCategoryValidationSchema,
    updateExpenseCategoryValidationSchema
} = require('../validation/expense-category.validation')
const {
    expenseCategories,
    addExpenseCategory,
    expenseCategoryDetails,
    updateExpenseCategory
} = require('../service/expense-category.service')


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


/**
 * controller function to update expense category
 * @param req
 * @param res
 * @return {Promise<void>}
 */
exports.expenseCategoryUpdatePatch = async (req, res) => {
    try{
        const { userId, expenseCategoryId } = req.params

        const { categoryName, categoryDescription, isActive } = req.body

        const dto = new UpdateExpenseCategoryDto(categoryName, categoryDescription, isActive)

        const { error } = updateExpenseCategoryValidationSchema.validate(dto)

        if(error){
            responseFormatter(res, new ErrorResponse(400, error.details[0].message))
        }

        await updateExpenseCategory(userId, expenseCategoryId, dto)

        responseFormatter(res, new SuccessResponse(200, 'Expense categories updated successfully!'))
    }catch (e) {
        console.error(e)
        responseFormatter(res, new ExceptionResponse(e))
    }
}
