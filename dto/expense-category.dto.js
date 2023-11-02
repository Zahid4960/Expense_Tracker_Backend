/**
 * dto class for add expense category
 */
class AddExpenseCategoryDto {
    constructor(categoryName, categoryDescription) {
        this.categoryName = categoryName
        this.categoryDescription = categoryDescription
    }
}

module.exports = {
    AddExpenseCategoryDto
}
