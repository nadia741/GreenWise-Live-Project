const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  createReview,
  getProductReviews,
  getRecentReviews,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");

// Get recent reviews for homepage - must come before parameterized routes
router.get("/recent/:limit", getRecentReviews);

// Product-specific review routes
router
  .route("/product/:productId")
  .get(getProductReviews)
  .post(protect, createReview);

router
  .route("/product/:productId/:reviewId")
  .put(protect, updateReview)
  .delete(protect, deleteReview);

module.exports = router;
