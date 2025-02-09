const { changePassword,loginClient } = require("../controller/clientsCtrl");
const express = require('express');
const router = express.Router();
const { verifyRole,verifyLoginRole } = require("../middleware/authMiddleware");

router.post('/login',verifyLoginRole(), loginClient);
router.put('/change-password', verifyRole(), changePassword);


module.exports = router;