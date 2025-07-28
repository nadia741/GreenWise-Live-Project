const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    getUserProfile,
    updateUserProfile,
    getWishlist,
    addToWishlist,
    removeFromWishlist
} = require('../controllers/userController');

router.get('/me', protect, getUserProfile);
router.put('/me', protect, updateUserProfile);
router.get('/wishlist', protect, getWishlist);
router.post('/wishlist/:productId', protect, addToWishlist);
router.delete('/wishlist/:productId', protect, removeFromWishlist);

module.exports = router;
