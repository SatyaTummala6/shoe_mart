const { resetPassword, forgotPasswordToken, registerClient, getCategories, getUserData } = require("../controller/clientsCtrl");


const express = require('express');
const { verifyRole } = require("../middleware/authMiddleware");
const { getProducts, getSupplierProducts, getAllProducts, getSingleProduct } = require("../controller/productCtrl");

const router = express.Router();

router.post('/register', registerClient);
router.get('/get-categories',getCategories)
router.post('/get-user-data', verifyRole(), getUserData);
router.post('/forgot-password', forgotPasswordToken);
router.put('/reset-password/:token', resetPassword);
console.log("test");
router.get('/get-products',getProducts)
router.get('/get-all-products',getAllProducts)
router.get('/get-supplier-products',getSupplierProducts)
router.get('/get-single-product/:id',getSingleProduct)


module.exports = router;