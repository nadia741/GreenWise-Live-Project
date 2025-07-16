export const products = [
  // Kids & Pets
  {
    id: "1",
    name: "Organic Baby Care Essential Kit",
    price: 52.99,
    rating: 4.9,
    reviews: 123,
    image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=400&h=400&fit=crop",
    sustainabilityScore: 95,
    certifications: ["USDA Organic", "Hypoallergenic"],
    carbonFootprint: "1.1kg CO₂ saved",
    isNew: true,
    isBestseller: false,
    description: "Complete organic baby care set with gentle lotions, soaps, and accessories. Safe for sensitive skin.",
    category: "Kids & Pets",
    subcategory: "Organic baby care"
  },
  {
    id: "2",
    name: "Sustainable Wooden Building Blocks",
    price: 34.99,
    originalPrice: 49.99,
    rating: 4.7,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1558877385-4debf23bb110?w=400&h=400&fit=crop",
    sustainabilityScore: 90,
    certifications: ["FSC Certified", "Non-Toxic Paint"],
    carbonFootprint: "1.8kg CO₂ saved",
    isNew: false,
    isBestseller: true,
    description: "Educational wooden blocks made from sustainably sourced wood with non-toxic finishes.",
    category: "Kids & Pets",
    subcategory: "Sustainable toys"
  },
  {
    id: "3",
    name: "Organic Pet Food - Chicken & Rice",
    price: 28.99,
    rating: 4.6,
    reviews: 234,
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=400&fit=crop",
    sustainabilityScore: 88,
    certifications: ["USDA Organic", "Grain-Free"],
    carbonFootprint: "2.2kg CO₂ saved",
    isNew: false,
    isBestseller: false,
    description: "Premium organic pet food made with free-range chicken and organic brown rice.",
    category: "Kids & Pets",
    subcategory: "Eco pet food"
  },

  // Beauty & Personal Care
  {
    id: "4",
    name: "Natural Vitamin C Serum",
    price: 39.99,
    originalPrice: 54.99,
    rating: 4.8,
    reviews: 456,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop",
    sustainabilityScore: 92,
    certifications: ["Organic", "Cruelty-Free", "Vegan"],
    carbonFootprint: "0.8kg CO₂ saved",
    isNew: true,
    isBestseller: true,
    description: "Brightening vitamin C serum with natural ingredients and recyclable glass packaging.",
    category: "Beauty & Personal Care",
    subcategory: "Natural skincare"
  },
  {
    id: "5",
    name: "Refillable Lipstick Set",
    price: 42.00,
    rating: 4.5,
    reviews: 178,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop",
    sustainabilityScore: 87,
    certifications: ["Refillable", "Natural Colors"],
    carbonFootprint: "1.2kg CO₂ saved",
    isNew: false,
    isBestseller: false,
    description: "Luxury refillable lipstick with natural pigments and sustainable packaging.",
    category: "Beauty & Personal Care",
    subcategory: "Refillable cosmetics"
  },
  {
    id: "6",
    name: "Zero Waste Shampoo Bar",
    price: 14.99,
    rating: 4.7,
    reviews: 445,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop",
    sustainabilityScore: 94,
    certifications: ["Cruelty-Free", "Vegan", "Plastic-Free"],
    carbonFootprint: "0.3kg CO₂ saved",
    isNew: false,
    isBestseller: true,
    description: "Concentrated shampoo bar with natural ingredients. One bar equals 2-3 bottles of liquid shampoo.",
    category: "Beauty & Personal Care",
    subcategory: "Zero-waste grooming"
  },

  // Home & Kitchen
  {
    id: "7",
    name: "Recycled Aluminum Cookware Set",
    price: 89.99,
    originalPrice: 119.99,
    rating: 4.6,
    reviews: 267,
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
    sustainabilityScore: 85,
    certifications: ["100% Recycled", "PFOA-Free"],
    carbonFootprint: "3.5kg CO₂ saved",
    isNew: false,
    isBestseller: false,
    description: "Professional-grade cookware made from 100% recycled aluminum with ceramic non-stick coating.",
    category: "Home & Kitchen",
    subcategory: "Recycled cookware"
  },
  {
    id: "8",
    name: "Compostable Multi-Surface Cleaner",
    price: 16.99,
    rating: 4.4,
    reviews: 198,
    image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?w=400&h=400&fit=crop",
    sustainabilityScore: 91,
    certifications: ["Biodegradable", "Plant-Based"],
    carbonFootprint: "0.6kg CO₂ saved",
    isNew: true,
    isBestseller: false,
    description: "Powerful plant-based cleaner in compostable packaging. Safe for all surfaces and the environment.",
    category: "Home & Kitchen",
    subcategory: "Compostable cleaners"
  },
  {
    id: "9",
    name: "Organic Cotton Bed Sheet Set",
    price: 68.00,
    rating: 4.8,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=400&h=400&fit=crop",
    sustainabilityScore: 89,
    certifications: ["GOTS Certified", "Fair Trade"],
    carbonFootprint: "2.1kg CO₂ saved",
    isNew: false,
    isBestseller: true,
    description: "Luxuriously soft organic cotton sheets with natural dyes and sustainable production.",
    category: "Home & Kitchen",
    subcategory: "Organic textiles"
  },

  // Bathroom Essentials
  {
    id: "10",
    name: "Bamboo Toothbrush Family Pack",
    price: 19.99,
    rating: 4.7,
    reviews: 334,
    image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400&h=400&fit=crop",
    sustainabilityScore: 94,
    certifications: ["Biodegradable", "Plastic-Free"],
    carbonFootprint: "0.4kg CO₂ saved",
    isNew: false,
    isBestseller: true,
    description: "Set of 4 bamboo toothbrushes with soft bristles. Biodegradable handles with recyclable packaging.",
    category: "Bathroom Essentials",
    subcategory: "Bamboo toothbrushes"
  },
  {
    id: "11",
    name: "Zero Waste Soap Bars Variety Pack",
    price: 24.99,
    rating: 4.5,
    reviews: 289,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop",
    sustainabilityScore: 92,
    certifications: ["Plastic-Free", "Natural Ingredients"],
    carbonFootprint: "0.7kg CO₂ saved",
    isNew: true,
    isBestseller: false,
    description: "Collection of 3 artisan soap bars: lavender, tea tree, and unscented. Completely plastic-free.",
    category: "Bathroom Essentials",
    subcategory: "Plastic-free soap"
  },
  {
    id: "12",
    name: "Low-Flow Showerhead",
    price: 45.99,
    originalPrice: 65.99,
    rating: 4.6,
    reviews: 145,
    image: "https://images.unsplash.com/photo-1584622781564-1d0b4c8ac2d1?w=400&h=400&fit=crop",
    sustainabilityScore: 88,
    certifications: ["WaterSense", "Chrome-Free"],
    carbonFootprint: "12.5kg CO₂ saved annually",
    isNew: false,
    isBestseller: false,
    description: "Water-saving showerhead that reduces usage by 40% while maintaining excellent pressure.",
    category: "Bathroom Essentials",
    subcategory: "Water-saving devices"
  },

  // Keep existing products for compatibility
  {
    id: "13",
    name: "Eco-Friendly Bamboo Water Bottle",
    price: 24.99,
    originalPrice: 34.99,
    rating: 4.8,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop",
    sustainabilityScore: 95,
    certifications: ["BPA-Free", "FSC Certified", "Carbon Neutral"],
    carbonFootprint: "2.5kg CO₂ saved",
    isNew: true,
    isBestseller: false,
    description: "Stay hydrated sustainably with our premium bamboo water bottle. Made from naturally antimicrobial bamboo fiber, this bottle keeps drinks fresh while reducing plastic waste.",
    category: "Drinkware"
  },
  {
    id: "14",
    name: "Organic Cotton Tote Bag",
    price: 18.99,
    rating: 4.6,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    sustainabilityScore: 88,
    certifications: ["GOTS Certified", "Fair Trade"],
    carbonFootprint: "1.8kg CO₂ saved",
    isNew: false,
    isBestseller: true,
    description: "Durable and stylish organic cotton tote bag perfect for shopping, work, or daily use. Made from certified organic cotton with reinforced handles.",
    category: "Bags"
  }
];

// Category structure for easy access
export const categories = {
  "Kids & Pets": {
    name: "Kids & Pets",
    subcategories: ["Organic baby care", "Sustainable toys", "Eco pet food"],
    icon: "👶"
  },
  "Beauty & Personal Care": {
    name: "Beauty & Personal Care", 
    subcategories: ["Natural skincare", "Refillable cosmetics", "Zero-waste grooming"],
    icon: "💄"
  },
  "Home & Kitchen": {
    name: "Home & Kitchen",
    subcategories: ["Recycled cookware", "Compostable cleaners", "Organic textiles"],
    icon: "🏠"
  },
  "Bathroom Essentials": {
    name: "Bathroom Essentials",
    subcategories: ["Bamboo toothbrushes", "Plastic-free soap", "Water-saving devices"],
    icon: "🚿"
  }
};
