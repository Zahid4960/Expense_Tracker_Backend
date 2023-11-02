/**
 * response class for expense categories
 */
class ExpenseCategories {
    constructor(id, categoryName, categoryDescription, isActive, createdAt) {
        this.id = id
        this.categoryName = categoryName
        this.categoryDescription = categoryDescription
        this.isActive = isActive
        this.createdAt = createdAt
    }
}

module.exports = {
    ExpenseCategories
}
