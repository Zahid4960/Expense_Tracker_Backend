const CustomException = require('../utility/custom-exception')
const { getUserById } = require('../repository/auth.repo')


/**
 * service function to get user wise expense categories
 * @param {string} userId
 * @return {*} expense categories || CustomException || []
 */
exports.expenseCategories = async (userId) => {
    const user = getUserById(userId)

    if(user === null){
        throw new CustomException(404, 'User not found!')
    }

    if(user.expenseCategories?.length > 0){
        return user.expenseCategories.filter(item => item.isActive === true)
    }

    return []
}
