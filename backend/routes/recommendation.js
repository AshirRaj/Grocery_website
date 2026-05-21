// routes/recommendation.js

const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const Order = require("../models/Order");

// GET recommendations
router.get("/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Step 1: Get user's past orders
    const orders = await Order.find({ userId });

    // Step 2: Extract categories from purchased products
    let categories = [];

    orders.forEach(order => {
      order.products.forEach(p => {
        categories.push(p.category);
      });
    });

    // Step 3: Find similar products
    const recommendedProducts = await Product.find({
      category: { $in: categories }
    }).limit(10);

    res.json(recommendedProducts);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;