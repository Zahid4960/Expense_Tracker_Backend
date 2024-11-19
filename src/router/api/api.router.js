const express = require('express')
const router = express.Router()
const { verifyToken, verifyUserAccount } = require('../../src/middleware/auth.middleware')
const authController = require('../../src/controller/auth.controller')
const addressController = require('../../src/controller/address.controller')
const expenseCategoryController = require('../../src/controller/expense-category.controller')


const prefix = 'user'

/**
 * api's for user module
 */
router.post(`/${prefix}/registration`, authController.registrationPost)
router.post(`/${prefix}/login`, authController.loginPost)
router.post(`/${prefix}/verify-via-otp`, verifyToken, authController.verifyUserViaOtpPost)
router.post(`/${prefix}/forgot-password`, verifyToken, verifyUserAccount, authController.forgotPasswordPost)
router.post(`/${prefix}/change-password`, verifyToken, verifyUserAccount, authController.changePasswordPost)
router.patch(`/${prefix}/update-profile/:userId`, verifyToken, verifyUserAccount, authController.userUpdateProfilePatch)
router.get(`/${prefix}/:userId`, verifyToken, verifyUserAccount, authController.userGet)
router.delete(`/${prefix}/:userId`, verifyToken, verifyUserAccount, authController.userDelete)


/**
 * api's for address module
 */
router.get(`/${prefix}/:userId/addresses`, verifyToken, verifyUserAccount, addressController.userAddressesGet)
router.post(`/${prefix}/:userId/addresses`, verifyToken, verifyUserAccount, addressController.userAddressesPost)
router.get(`/${prefix}/:userId/addresses/:addressId`, verifyToken, verifyUserAccount, addressController.addressByAddressIdGet)
router.patch(`/${prefix}/:userId/addresses/:addressId`, verifyToken, verifyUserAccount, addressController.updateAddressPatch)
router.delete(`/${prefix}/:userId/addresses/:addressId`, verifyToken, verifyUserAccount, addressController.addressDelete)


/**
 * api's for expense categories module
 */
router.get(`/${prefix}/:userId/expense-categories`, verifyToken, verifyUserAccount, expenseCategoryController.expenseCategoriesGet)
router.post(`/${prefix}/:userId/expense-categories`, verifyToken, verifyUserAccount, expenseCategoryController.addExpenseCategoriesPost)
router.get(`/${prefix}/:userId/expense-categories/:expenseCategoryId`, verifyToken, verifyUserAccount, expenseCategoryController.expenseCategoryDetailsGet)
router.patch(`/${prefix}/:userId/expense-categories/:expenseCategoryId`, verifyToken, verifyUserAccount, expenseCategoryController.expenseCategoryUpdatePatch)
router.delete(`/${prefix}/:userId/expense-categories/:expenseCategoryId`, verifyToken, verifyUserAccount, expenseCategoryController.expenseCategoryDelete)

module.exports = router
