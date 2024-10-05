// server/routes/orders.js

const express = require('express');
const router = express.Router();
const { createOrder, processPayment } = require('../controllers/orderController');

router.post('/', createOrder);
router.post('/pay', processPayment);

module.exports = router;
