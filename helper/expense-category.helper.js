const { ExpenseCategories } = require('../response/expense-category.response')


/**
 * helper function to get formatted expense categories
 * @param { Array } expenseCategories
 * @return { Array || [] }
 */
exports.formattedExpenseCategories = (expenseCategories) => {
    if(expenseCategories?.length > 0){
        expenseCategories.map(expCat => {
            const response = new ExpenseCategories()
            response.id = expCat.id
            response.categoryName = expCat.categoryName
            response.categoryDescription = expCat.categoryDescription
            response.isActive = expCat.isActive
            response.createdAt = expCat.createdAt

            return response
        })
    }

    return []
}
