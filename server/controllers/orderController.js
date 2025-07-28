const Order = require('../models/orderModel');
const Product = require('../models/productModel');
const nodemailer = require('nodemailer');

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        totalPrice
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No order items');
    }

    // Verify inventory and update it
    for (let item of orderItems) {
        const product = await Product.findById(item.product);
        if (!product) {
            res.status(404);
            throw new Error(`Product not found: ${item.product}`);
        }
        if (product.inventory < item.quantity) {
            res.status(400);
            throw new Error(`Not enough inventory for ${product.name}`);
        }
        product.inventory -= item.quantity;
        await product.save();
    }

    const order = await Order.create({
        user: req.user._id,
        orderItems,
        shippingAddress,
        totalPrice
    });

    if (order) {
        // Send confirmation email if email service is configured
        if (process.env.EMAIL_SERVICE) {
            try {
                const transporter = nodemailer.createTransport({
                    service: process.env.EMAIL_SERVICE,
                    auth: {
                        user: process.env.EMAIL_USERNAME,
                        pass: process.env.EMAIL_PASSWORD
                    }
                });

                await transporter.sendMail({
                    from: process.env.EMAIL_FROM,
                    to: req.user.email,
                    subject: 'Order Confirmation - GreenWise',
                    html: `
                        <h1>Thank you for your order!</h1>
                        <p>Order ID: ${order._id}</p>
                        <p>Total: $${order.totalPrice}</p>
                    `
                });
            } catch (error) {
                console.error('Email sending failed:', error);
            }
        }

        res.status(201).json(order);
    } else {
        res.status(400);
        throw new Error('Invalid order data');
    }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res) => {
    const order = await Order.findById(req.params.id)
        .populate('user', 'name email');

    if (order && (order.user._id.toString() === req.user._id.toString())) {
        res.json(order);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
};

// @desc    Get logged in user orders
// @route   GET /api/orders
// @access  Private
const getUserOrders = async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.json(orders);
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        order.status = req.body.status || order.status;
        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
};

module.exports = {
    createOrder,
    getOrderById,
    getUserOrders,
    updateOrderStatus
};
