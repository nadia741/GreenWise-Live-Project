const Review = require('../models/reviewModel');
const Product = require('../models/productModel');

// @desc    Create new review
// @route   POST /api/reviews/:productId
// @access  Private
const createReview = async (req, res) => {
    const { rating, comment } = req.body;
    const productId = req.params.productId;

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
        res.status(404);
        throw new Error('Product not found');
    }

    // Check if user already reviewed this product
    const existingReview = await Review.findOne({
        user: req.user._id,
        product: productId
    });

    if (existingReview) {
        res.status(400);
        throw new Error('Product already reviewed');
    }

    const review = await Review.create({
        user: req.user._id,
        product: productId,
        rating,
        comment
    });

    // Update product average rating
    const allReviews = await Review.find({ product: productId });
    const totalRating = allReviews.reduce((sum, item) => sum + item.rating, 0);
    product.averageRating = totalRating / allReviews.length;
    product.numReviews = allReviews.length;
    await product.save();

    res.status(201).json(review);
};

// @desc    Get all reviews for a product
// @route   GET /api/reviews/:productId
// @access  Public
const getProductReviews = async (req, res) => {
    const reviews = await Review.find({ product: req.params.productId })
        .populate('user', 'name');
    res.json(reviews);
};

// @desc    Update review
// @route   PUT /api/reviews/:productId/:reviewId
// @access  Private
const updateReview = async (req, res) => {
    const review = await Review.findById(req.params.reviewId);

    if (review && review.user.toString() === req.user._id.toString()) {
        review.rating = req.body.rating || review.rating;
        review.comment = req.body.comment || review.comment;

        const updatedReview = await review.save();

        // Update product average rating
        const product = await Product.findById(req.params.productId);
        const allReviews = await Review.find({ product: req.params.productId });
        const totalRating = allReviews.reduce((sum, item) => sum + item.rating, 0);
        product.averageRating = totalRating / allReviews.length;
        await product.save();

        res.json(updatedReview);
    } else {
        res.status(404);
        throw new Error('Review not found or unauthorized');
    }
};

// @desc    Delete review
// @route   DELETE /api/reviews/:productId/:reviewId
// @access  Private
const deleteReview = async (req, res) => {
    const review = await Review.findById(req.params.reviewId);

    if (review && review.user.toString() === req.user._id.toString()) {
        await review.remove();

        // Update product average rating
        const product = await Product.findById(req.params.productId);
        const allReviews = await Review.find({ product: req.params.productId });
        if (allReviews.length > 0) {
            const totalRating = allReviews.reduce((sum, item) => sum + item.rating, 0);
            product.averageRating = totalRating / allReviews.length;
        } else {
            product.averageRating = 0;
        }
        product.numReviews = allReviews.length;
        await product.save();

        res.json({ message: 'Review removed' });
    } else {
        res.status(404);
        throw new Error('Review not found or unauthorized');
    }
};

module.exports = {
    createReview,
    getProductReviews,
    updateReview,
    deleteReview
};
