const CustomException = require('../utility/custom-exception')
const { getUserById } = require('../repository/auth.repo')


/**
 * service function to get user wise expense categories
 * @param {string} userId
 * @return {*} expense categories || CustomException || []
 */
exports.expenseCategories = async (userId) => {
    const user = await getUserById(userId)

    if(user === null){
        throw new CustomException(404, 'User not found!')
    }

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
    const user = await getUserById(userId)

    const { categoryName, categoryDescription } = expenseCategory

    if(user === null){
        throw new CustomException(404, 'User not found!')
    }

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
