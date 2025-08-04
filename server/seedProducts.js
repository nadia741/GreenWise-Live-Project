const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/productModel");

// Load env vars
dotenv.config();

// Sample products data
const sampleProducts = [
  {
    name: "Eco-Friendly Bamboo Water Bottle",
    description:
      "Made from sustainable bamboo, this water bottle is perfect for eco-conscious individuals. Features double-wall insulation and leak-proof design.",
    price: 24.99,
    category: "general",
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&h=600&fit=crop",
    sustainabilityScore: 9.2,
    inventory: 50,
    averageRating: 4.8,
    numReviews: 156,
    sustainabilityFeatures: [
      "Recyclable",
      "BPA-free",
      "Long-lasting",
      "Plastic-free",
    ],
  },
  {
    name: "Organic Cotton Tote Bag",
    description:
      "Durable organic cotton tote bag perfect for grocery shopping and daily use. Reduces plastic waste significantly.",
    price: 18.99,
    category: "accessories",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop",
    sustainabilityScore: 8.5,
    inventory: 75,
    averageRating: 4.6,
    numReviews: 89,
    sustainabilityFeatures: [
      "Organic ingredients",
      "Durable materials",
      "No plastic packaging",
      "Biodegradable",
    ],
  },
  {
    name: "Solar-Powered LED Lantern",
    description:
      "Rechargeable solar lantern that provides bright LED lighting without electricity. Perfect for camping and emergencies.",
    price: 34.99,
    category: "electronics",
    image:
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&h=600&fit=crop",
    sustainabilityScore: 9.0,
    inventory: 30,
    averageRating: 4.7,
    numReviews: 124,
    sustainabilityFeatures: [
      "Solar energy",
      "No electricity required",
      "Long-lasting",
      "Durable materials",
    ],
  },
  {
    name: "Bamboo Fiber Dinnerware Set",
    description:
      "Complete dinnerware set made from bamboo fiber. Lightweight, durable and completely biodegradable.",
    price: 42.99,
    category: "home",
    image:
      "https://images.unsplash.com/photo-1584306670336-588c8f315db3?w=600&h=600&fit=crop",
    sustainabilityScore: 8.8,
    inventory: 40,
    averageRating: 4.5,
    numReviews: 67,
    sustainabilityFeatures: [
      "Biodegradable",
      "BPA-free",
      "100% compostable",
      "Natural ingredients",
    ],
  },
  {
    name: "Organic Honey Raw & Unfiltered",
    description:
      "Pure, raw honey harvested using bee-friendly methods. Rich in antioxidants and natural enzymes.",
    price: 16.99,
    category: "food",
    image:
      "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=600&h=600&fit=crop",
    sustainabilityScore: 9.5,
    inventory: 100,
    averageRating: 4.9,
    numReviews: 234,
    sustainabilityFeatures: [
      "Bee-friendly harvesting",
      "Organic ingredients",
      "No artificial additives",
      "Plastic-free jar",
    ],
  },
  {
    name: "Hemp Canvas Backpack",
    description:
      "Sturdy backpack made from hemp canvas. Water-resistant and perfect for outdoor adventures and daily commuting.",
    price: 59.99,
    category: "accessories",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop",
    sustainabilityScore: 8.7,
    inventory: 25,
    averageRating: 4.6,
    numReviews: 98,
    sustainabilityFeatures: [
      "Water-resistant",
      "Durable materials",
      "Natural ingredients",
      "Long-lasting",
    ],
  },
  {
    name: "Organic Cotton T-Shirt",
    description:
      "Soft, comfortable t-shirt made from 100% organic cotton. Ethically sourced and sustainably produced.",
    price: 28.99,
    category: "clothing",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop",
    sustainabilityScore: 8.3,
    inventory: 60,
    averageRating: 4.4,
    numReviews: 145,
    sustainabilityFeatures: [
      "Organic ingredients",
      "Cruelty-free",
      "Zero toxic chemicals",
      "Biodegradable",
    ],
  },
  {
    name: "Stainless Steel Food Container",
    description:
      "Premium stainless steel food container with airtight seal. Perfect for meal prep and reducing single-use containers.",
    price: 32.99,
    category: "home",
    image:
      "https://images.unsplash.com/photo-1544651664-e1112e7c2d5d?w=600&h=600&fit=crop",
    sustainabilityScore: 9.1,
    inventory: 45,
    averageRating: 4.8,
    numReviews: 178,
    sustainabilityFeatures: [
      "BPA-free",
      "Long-lasting",
      "Recyclable",
      "No plastic packaging",
    ],
  },
  {
    name: "Coconut Bowl Set",
    description:
      "Beautiful bowl set made from upcycled coconut shells. Each bowl is unique and helps reduce waste.",
    price: 21.99,
    category: "home",
    image:
      "https://images.unsplash.com/photo-1584306670336-588c8f315db3?w=600&h=600&fit=crop",
    sustainabilityScore: 9.3,
    inventory: 35,
    averageRating: 4.7,
    numReviews: 89,
    sustainabilityFeatures: [
      "100% compostable",
      "Natural ingredients",
      "Biodegradable",
      "Locally sourced",
    ],
  },
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB");

    // Clear existing products
    await Product.deleteMany({});
    console.log("Cleared existing products");

    // Insert sample products
    await Product.insertMany(sampleProducts);
    console.log("Sample products added successfully");

    console.log(`${sampleProducts.length} products seeded`);
    process.exit(0);
  } catch (error) {
    console.error("Error seeding products:", error);
    process.exit(1);
  }
};

seedProducts();
