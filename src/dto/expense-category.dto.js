/**
 * dto class for add expense category
 */
class AddExpenseCategoryDto {
    constructor(categoryName, categoryDescription) {
        this.categoryName = categoryName
        this.categoryDescription = categoryDescription
    }
}


class UpdateExpenseCategoryDto extends AddExpenseCategoryDto {
    constructor(categoryName, categoryDescription, isActive) {
        super(categoryName, categoryDescription)
        this.isActive = isActive
    }
}

module.exports = {
    AddExpenseCategoryDto,
    UpdateExpenseCategoryDto
}
