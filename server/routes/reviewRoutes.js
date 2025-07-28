const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    createReview,
    getProductReviews,
    updateReview,
    deleteReview
} = require('../controllers/reviewController');

router.route('/:productId')
    .get(getProductReviews)
    .post(protect, createReview);

router.route('/:productId/:reviewId')
    .put(protect, updateReview)
    .delete(protect, deleteReview);

module.exports = router;
