const CustomException = require('../utility/custom-exception')
const { getUserById, updateUserByFilters} = require('../repository/auth.repo')


/**
 * service function to get user wise expense categories
 * @param {string} userId
 * @return {*} expense categories || CustomException || []
 */
exports.expenseCategories = async (userId) => {
    const user = await checkUserExistOrNot(userId)

    if(user.expenseCategories?.length > 0){
        return user.expenseCategories.filter(item => item.isActive === true)
    }

    return []
}


/**
 * service function to add user expense category
 * @param {string} userId
 * @param {Object} expenseCategory
 * @return {Promise<void>}
 */
exports.addExpenseCategory = async (userId, expenseCategory) => {
    const user = await checkUserExistOrNot(userId)

    const { categoryName, categoryDescription } = expenseCategory

    const isExpCatAlreadyExist = user.expenseCategories.find(item => item.categoryName === categoryName)

    if(isExpCatAlreadyExist === undefined){
        const dataToAdd = {
            categoryName,
            categoryDescription
        }

        user.expenseCategories.push(dataToAdd)
        await user.save()
    }else{
        throw new CustomException(409, `${categoryName} already exist!`)
    }
}


/**
 * service function to get expense category details
 * @param {string} userId
 * @param {string} expCatId
 * @return {Object}
 */
exports.expenseCategoryDetails = async (userId, expCatId) => {
    const user = await checkUserExistOrNot(userId)

    const expCat = await checkExpenseCategoryExistOrNot(user, expCatId)

    return expCat
}


/**
 * service function to update expense category
 * @param {string} userId
 * @param {string} expenseCategoryId
 * @param {Object} payload
 * @return {Object}
 */
exports.updateExpenseCategory = async (userId, expenseCategoryId, payload) => {
    const user = await checkUserExistOrNot(userId)

    await checkExpenseCategoryExistOrNot(user, expenseCategoryId)

    const filters = { '_id': userId, 'expenseCategories._id': expenseCategoryId }

    const { categoryName, categoryDescription, isActive } = payload

    const isExpCatAlreadyExist = user.expenseCategories.find(item =>
        item.id !== expenseCategoryId
        && item.categoryName === categoryName
    )

    if(isExpCatAlreadyExist === undefined){
        const dataToUpdate = {
            $set: {
                'expenseCategories.$.categoryName': categoryName,
                'expenseCategories.$.categoryDescription': categoryDescription,
                'expenseCategories.$.isActive': isActive,
            }
        }

        await updateUserByFilters(filters, dataToUpdate)
    }else{
        throw new CustomException(409, `${categoryName} already exist!`)
    }
}


/**
 * service function to delete an expense category
 * @param {string} userId
 * @param {string} expenseCategoryId
 */
exports.deleteExpenseCategory = async (userId, expenseCategoryId) => {
    const user = await checkUserExistOrNot(userId)

    await checkExpenseCategoryExistOrNot(user, expenseCategoryId)

    const filters = { '_id': userId, 'expenseCategories._id': expenseCategoryId }

    const dataToDelete = {
        $set: {
            'expenseCategories.$.isActive': false,
        }
    }

    await updateUserByFilters(filters, dataToDelete)
}


/**
 * function to check valid user exist or not by userId
 * @param {string} userId
 * @return {Object}
 */
const checkUserExistOrNot = async (userId) => {
    const user = await getUserById(userId)

    if(user === null){
        throw new CustomException(404, 'User not found!')
    }else{
        return user
    }
}


/**
 * function to check valid user exist or not by expenseCategoryId
 * @param {Object} user
 * @param {string} expenseCategoryId
 * @return {Object}
 */
const checkExpenseCategoryExistOrNot = async (user, expenseCategoryId) => {
    const expCat = user.expenseCategories.find(item => item.id === expenseCategoryId)

    if(expCat === undefined){
        throw new CustomException(404, 'Expense category not found!')
    }

    return expCat
}
