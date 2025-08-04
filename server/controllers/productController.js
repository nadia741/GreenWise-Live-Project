const Product = require("../models/productModel");

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    const {
      search,
      category,
      minPrice,
      maxPrice,
      minSustainabilityScore,
      page = 1,
      limit = 8,
      sustainabilityFeatures,
    } = req.query;

    let query = {};

    // Search by name or description
    if (search) {
      query.$text = { $search: search };
    }

    // Filter by category
    if (category) {
      query.category = category;
    }

    // Filter by price range
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Filter by sustainability score
    if (minSustainabilityScore) {
      query.sustainabilityScore = { $gte: Number(minSustainabilityScore) };
    }

    // Filter by sustainability features
    if (sustainabilityFeatures) {
      const features = Array.isArray(sustainabilityFeatures)
        ? sustainabilityFeatures
        : [sustainabilityFeatures];
      query.sustainabilityFeatures = { $in: features };
    }

    // Calculate pagination values
    const startIndex = (Number(page) - 1) * Number(limit);
    const totalProducts = await Product.countDocuments(query);

    // Get products with pagination
    const products = await Product.find(query)
      .limit(Number(limit))
      .skip(startIndex)
      .sort({ createdAt: -1 });

    res.json({
      products,
      currentPage: Number(page),
      totalPages: Math.ceil(totalProducts / Number(limit)),
      totalProducts,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res
      .status(500)
      .json({
        message: "Server error while fetching products",
        error: error.message,
      });
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error("Error fetching product:", error);
    res
      .status(500)
      .json({
        message: "Server error while fetching product",
        error: error.message,
      });
  }
};

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      image,
      sustainabilityScore,
      inventory,
      sustainabilityFeatures,
    } = req.body;

    const product = await Product.create({
      name,
      description,
      price,
      category,
      image,
      sustainabilityScore,
      inventory,
      sustainabilityFeatures,
    });

    res.status(201).json(product);
  } catch (error) {
    console.error("Error creating product:", error);
    res
      .status(500)
      .json({
        message: "Server error while creating product",
        error: error.message,
      });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = req.body.name || product.name;
      product.description = req.body.description || product.description;
      product.price = req.body.price || product.price;
      product.category = req.body.category || product.category;
      product.image = req.body.image || product.image;
      product.sustainabilityScore =
        req.body.sustainabilityScore || product.sustainabilityScore;
      product.inventory = req.body.inventory || product.inventory;
      product.sustainabilityFeatures =
        req.body.sustainabilityFeatures || product.sustainabilityFeatures;

      const updatedProduct = await product.save();
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error("Error updating product:", error);
    res
      .status(500)
      .json({
        message: "Server error while updating product",
        error: error.message,
      });
  }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      await Product.findByIdAndDelete(req.params.id);
      res.json({ message: "Product removed" });
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    res
      .status(500)
      .json({
        message: "Server error while deleting product",
        error: error.message,
      });
  }
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
