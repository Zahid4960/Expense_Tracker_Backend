const { ExpenseCategories } = require('../response/expense-category.response')
const { convertIsoDateTimeToUTCDateTime } = require('../helper/common.helper')


/**
 * helper function to get formatted expense categories
 * @param {Array | Object} expenseCategories
 * @return {Array | Object}
 */
exports.formattedExpenseCategories = (expenseCategories) => {
    if(expenseCategories?.length > 0){
         return expenseCategories.map(expCat => {
            return formatExpenseCategory(expCat)
        })
    }else{
        return formatExpenseCategory(expenseCategories)
    }
}


/**
 * helper function to format expense category
 * @param {Object} expCatObj
 * @return {Object}
 */
const formatExpenseCategory = (expCatObj) => {
    const response = new ExpenseCategories()
    response.id = expCatObj.id
    response.categoryName = expCatObj.categoryName
    response.categoryDescription = expCatObj.categoryDescription
    response.isActive = expCatObj.isActive
    response.createdAt = convertIsoDateTimeToUTCDateTime(expCatObj.createdAt)

    return response
}
