const User = require('../models/userModel');

// @desc    Get user profile
// @route   GET /api/users/me
// @access  Private
const getUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            address: user.address,
            preferences: user.preferences
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
};

// @desc    Update user profile
// @route   PUT /api/users/me
// @access  Private
const updateUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
            user.password = req.body.password;
        }
        if (req.body.address) {
            user.address = req.body.address;
        }
        if (req.body.preferences) {
            user.preferences = req.body.preferences;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            address: updatedUser.address,
            preferences: updatedUser.preferences
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
};

// @desc    Get user's wishlist
// @route   GET /api/users/wishlist
// @access  Private
const getWishlist = async (req, res) => {
    const user = await User.findById(req.user._id).populate('wishlist');
    if (user) {
        res.json(user.wishlist);
    } else {
        res.status(404);
        throw new Error('User not found');
    }
};

// @desc    Add product to wishlist
// @route   POST /api/users/wishlist/:productId
// @access  Private
const addToWishlist = async (req, res) => {
    const user = await User.findById(req.user._id);
    const productId = req.params.productId;

    if (user && !user.wishlist.includes(productId)) {
        user.wishlist.push(productId);
        await user.save();
        res.json(user.wishlist);
    } else {
        res.status(400);
        throw new Error('Product already in wishlist');
    }
};

// @desc    Remove product from wishlist
// @route   DELETE /api/users/wishlist/:productId
// @access  Private
const removeFromWishlist = async (req, res) => {
    const user = await User.findById(req.user._id);
    const productId = req.params.productId;

    if (user) {
        user.wishlist = user.wishlist.filter(id => id.toString() !== productId);
        await user.save();
        res.json(user.wishlist);
    } else {
        res.status(404);
        throw new Error('User not found');
    }
};

module.exports = {
    getUserProfile,
    updateUserProfile,
    getWishlist,
    addToWishlist,
    removeFromWishlist
};
