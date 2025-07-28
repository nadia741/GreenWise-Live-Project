const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const {
    createOrder,
    getOrderById,
    getUserOrders,
    updateOrderStatus
} = require('../controllers/orderController');

router.route('/')
    .post(protect, createOrder)
    .get(protect, getUserOrders);

router.route('/:id')
    .get(protect, getOrderById);

router.route('/:id/status')
    .put(protect, admin, updateOrderStatus);

module.exports = router;
