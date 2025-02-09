const { createCategory } = require("../controller/categoriesCtrl");
const { changePassword,loginClient, getClients, getEmployees } = require("../controller/clientsCtrl");
const { getItemCategories, createItemCategory } = require("../controller/itemCategoriesCtrl");
const { createProduct, uploadProduct, uploadProducts } = require("../controller/productCtrl");
const { verifyAdmin, verifyRole, verifyAdminSupplier } = require("../middleware/authMiddleware");
const express = require('express');
const { uploadPhoto } = require("../middleware/uploadImages");
const { getAllBalanceOrderDetails, updateBalanceStatusOrder, getBalanceOrderDetails, updateListOrder,getOrderItems, getAllOrderDetails, updateStatusOrder } = require("../controller/orderCtrl");
const router = express.Router();

router.post('/create-category', createCategory);
router.post('/login', loginClient);
router.get('/get-clients', verifyAdmin(), getClients);
router.get('/get-employees', verifyAdmin(), getEmployees);
router.put('/change-password', verifyRole(), changePassword);
router.post('/create-item-category',verifyAdmin(), createItemCategory);

router.get('/get-item-categories', getItemCategories);
router.post('/create-product',verifyAdminSupplier(), createProduct);
router.put('/upload-product', verifyAdminSupplier(), uploadPhoto.single("file"), uploadProduct);
router.put('/upload-products', verifyAdminSupplier(), uploadPhoto.array("files", 10), uploadProducts);
router.get('/get-all-orders',verifyAdmin(), getAllOrderDetails);
router.get('/get-order-data/:id',verifyAdmin(), getOrderItems);
router.put('/update-order-status', verifyAdmin(), updateStatusOrder);

router.put('/update-order-list', verifyAdmin(), updateListOrder);
router.get('/get-all-pending-orders',verifyAdmin(), getAllBalanceOrderDetails);
router.get('/get-balance-order-data/:id',verifyAdmin(), getBalanceOrderDetails);
router.put('/update-balance-order-status', verifyAdmin(), updateBalanceStatusOrder);


module.exports = router;