const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getUserProfile,
  updateUserProfile,
  addToWishlist,
  removeFromWishlist,
  getWishlist,
} = require("../controllers/userController");

router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.route("/wishlist").get(protect, getWishlist);

router
  .route("/wishlist/:productId")
  .post(protect, addToWishlist)
  .delete(protect, removeFromWishlist);

module.exports = router;
