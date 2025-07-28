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
        type: String
    }]
}, {
    timestamps: true
});

// Add text index for search functionality
productSchema.index({ name: 'text', description: 'text' });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
