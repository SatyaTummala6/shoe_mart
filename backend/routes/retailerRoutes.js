const { changePassword,loginClient } = require("../controller/clientsCtrl");
const { createCart,getCart } = require("../controller/cartCtrl");
const express = require('express');
const router = express.Router();
const { verifyClientRole, verifyRole,verifyLoginRole } = require("../middleware/authMiddleware");
const { createOrder, getOrders, getOrderItems } = require("../controller/orderCtrl");

router.post('/login',verifyLoginRole(), loginClient);
router.put('/change-password', verifyRole(), changePassword);
router.post('/add-to-cart', verifyClientRole(), createCart);
router.get('/get-cart/:id', verifyClientRole(), getCart);
router.post('/place-order', verifyClientRole(), createOrder);
router.get('/get-orders/:id', verifyClientRole(), getOrders);
router.get('/get-order-data/:id', verifyClientRole(), getOrderItems);

module.exports = router;