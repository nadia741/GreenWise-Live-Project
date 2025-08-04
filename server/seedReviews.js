const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Review = require("./models/reviewModel");
const User = require("./models/userModel");
const Product = require("./models/productModel");

// Load env vars
dotenv.config();

const seedReviews = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");

    // Get existing users and products
    const users = await User.find({});
    const products = await Product.find({});

    if (users.length === 0 || products.length === 0) {
      console.log(
        "No users or products found. Please create users and products first."
      );
      process.exit(1);
    }

    // Clear existing reviews
    await Review.deleteMany({});
    console.log("Cleared existing reviews");

    // Sample reviews data
    const sampleReviews = [
      {
        user: users[0]._id,
        product: products[0]._id,
        rating: 5,
        comment:
          "Amazing product! The quality is outstanding and it's truly eco-friendly. I love how it helps reduce my carbon footprint.",
      },
      {
        user: users[1]._id,
        product: products[0]._id,
        rating: 4,
        comment:
          "Great product overall. Good quality and sustainable materials. Would definitely recommend to eco-conscious buyers.",
      },
      {
        user: users[2]._id,
        product: products[1]._id,
        rating: 5,
        comment:
          "Perfect for my daily use! The design is beautiful and it's completely sustainable. Best purchase I've made this year.",
      },
      {
        user: users[0]._id,
        product: products[2]._id,
        rating: 4,
        comment:
          "Really impressed with the build quality. It's clear that sustainability doesn't mean compromising on quality.",
      },
      {
        user: users[1]._id,
        product: products[3]._id,
        rating: 5,
        comment:
          "Excellent value for money. The product exceeded my expectations and I love the eco-friendly packaging too.",
      },
      {
        user: users[2]._id,
        product: products[4]._id,
        rating: 4,
        comment:
          "Great addition to my sustainable lifestyle. The product works exactly as described and feels premium.",
      },
      {
        user: users[0]._id,
        product: products[5]._id,
        rating: 5,
        comment:
          "Outstanding quality and truly sustainable. I appreciate the company's commitment to environmental responsibility.",
      },
      {
        user: users[1]._id,
        product: products[6]._id,
        rating: 4,
        comment:
          "Very satisfied with this purchase. Good quality materials and great customer service.",
      },
      {
        user: users[2]._id,
        product: products[7]._id,
        rating: 5,
        comment:
          "Love this product! It's exactly what I was looking for in terms of sustainability and functionality.",
      },
      {
        user: users[0]._id,
        product: products[8]._id,
        rating: 4,
        comment:
          "Solid product with great environmental benefits. Would buy from this company again.",
      },
    ];

    // Insert sample reviews
    const createdReviews = await Review.insertMany(sampleReviews);
    console.log("Sample reviews added successfully");

    // Update product ratings based on reviews
    for (const product of products) {
      const productReviews = await Review.find({ product: product._id });
      if (productReviews.length > 0) {
        const totalRating = productReviews.reduce(
          (sum, review) => sum + review.rating,
          0
        );
        product.averageRating = totalRating / productReviews.length;
        product.numReviews = productReviews.length;
        await product.save();
      }
    }

    console.log(
      `${createdReviews.length} reviews seeded and product ratings updated`
    );
    process.exit(0);
  } catch (error) {
    console.error("Error seeding reviews:", error);
    process.exit(1);
  }
};

seedReviews();
