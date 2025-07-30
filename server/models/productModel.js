const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        default: 'general',
        enum: ['general', 'food', 'clothing', 'electronics', 'home', 'accessories'],
        required: true
    },
    image: {
        type: String,
        required: true
    },
    sustainabilityScore: {
        type: Number,
        required: true,
        min: 0,
        max: 10
    },
    inventory: {
        type: Number,
        required: true,
        min: 0
    },
    averageRating: {
        type: Number,
        default: 0
    },
    numReviews: {
        type: Number,
        default: 0
    },
    sustainabilityFeatures: [{
        type: String,
        enum: [
        "Recyclable",
        "BPA-free",
        "Long-lasting",
        "Locally sourced",
        "No plastic packaging",
        "Bee-friendly harvesting",
        "Solar energy",
        "Durable materials",
        "No electricity required",
        "Plastic-free",
        "100% compostable",
        "Zero toxic chemicals",
        "Vegan",
        "Biodegradable",
        "Water-resistant",
        "Organic ingredients",
        "Compostable packaging",
        "No artificial additives",
        "Cruelty-free",
        "Plastic-free jar",
        "Natural ingredients"
        ],
        default: [],
        required: false
    }]
}, {
    timestamps: true
});

// Add text index for search functionality
productSchema.index({ name: 'text', description: 'text' });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
