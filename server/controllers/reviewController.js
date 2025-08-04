const Review = require("../models/reviewModel");
const Product = require("../models/productModel");

// @desc    Create new review
// @route   POST /api/reviews/:productId
// @access  Private
const createReview = async (req, res) => {
  const { rating, comment } = req.body;
  const productId = req.params.productId;

  try {
    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if user already reviewed this product
    const existingReview = await Review.findOne({
      user: req.user._id,
      product: productId,
    });

    if (existingReview) {
      return res.status(400).json({ message: "Product already reviewed" });
    }

    const review = await Review.create({
      user: req.user._id,
      product: productId,
      rating,
      comment,
    });

    // Populate the review with user and product data
    await review.populate("user", "name");
    await review.populate("product", "name");

    // Update product average rating
    const allReviews = await Review.find({ product: productId });
    const totalRating = allReviews.reduce((sum, item) => sum + item.rating, 0);
    product.averageRating = totalRating / allReviews.length;
    product.numReviews = allReviews.length;
    await product.save();

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get all reviews for a product
// @route   GET /api/reviews/:productId
// @access  Public
const getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.productId })
      .populate("user", "name")
      .populate("product", "name")
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Get recent reviews for homepage
// @route   GET /api/reviews/recent/:limit
// @access  Public
const getRecentReviews = async (req, res) => {
  try {
    const limit = parseInt(req.params.limit) || 6;
    const reviews = await Review.find({})
      .populate("user", "name")
      .populate("product", "name image")
      .sort({ createdAt: -1 })
      .limit(limit);
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Update review
// @route   PUT /api/reviews/:productId/:reviewId
// @access  Private
const updateReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);

    if (review && review.user.toString() === req.user._id.toString()) {
      review.rating = req.body.rating || review.rating;
      review.comment = req.body.comment || review.comment;

      const updatedReview = await review.save();
      await updatedReview.populate("user", "name");

      // Update product average rating
      const product = await Product.findById(req.params.productId);
      const allReviews = await Review.find({ product: req.params.productId });
      const totalRating = allReviews.reduce(
        (sum, item) => sum + item.rating,
        0
      );
      product.averageRating = totalRating / allReviews.length;
      await product.save();

      res.json(updatedReview);
    } else {
      res.status(404).json({ message: "Review not found or unauthorized" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc    Delete review
// @route   DELETE /api/reviews/:productId/:reviewId
// @access  Private
const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.reviewId);

    if (review && review.user.toString() === req.user._id.toString()) {
      await Review.findByIdAndDelete(req.params.reviewId);

      // Update product average rating
      const product = await Product.findById(req.params.productId);
      const allReviews = await Review.find({ product: req.params.productId });
      if (allReviews.length > 0) {
        const totalRating = allReviews.reduce(
          (sum, item) => sum + item.rating,
          0
        );
        product.averageRating = totalRating / allReviews.length;
      } else {
        product.averageRating = 0;
      }
      product.numReviews = allReviews.length;
      await product.save();

      res.json({ message: "Review removed" });
    } else {
      res.status(404).json({ message: "Review not found or unauthorized" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createReview,
  getProductReviews,
  getRecentReviews,
  updateReview,
  deleteReview,
};
