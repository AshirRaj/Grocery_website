// AdminRoutes.js
import jwt from "jsonwebtoken";
import Order from "../models/order.model.js";
import Product from "../models/product.model.js";

export const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "7d" });
      res.cookie("adminToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "Strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      return res.status(200).json({ success: true, message: "Admin login successful" });
    }
    return res.status(400).json({ success: false, message: "Invalid credentials" });
  } catch (error) {
    console.error("Error in adminLogin:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const adminLogout = async (_req, res) => {
  try {
    res.clearCookie("adminToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "Strict",
    });
    return res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    console.error("Error in adminLogout:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const adminCheckAuth = async (_req, res) => {
  try {
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error in adminCheckAuth:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const adminAllOrders = async (_req, res) => {
  try {
    const orders = await Order.find({ $or: [{ paymentType: "COD" }, { isPaid: true }] })
      .populate("items.product address")
      .sort({ createdAt: -1 });
    return res.status(200).json({ success: true, orders });
  } catch (error) {
    console.error("Error in adminAllOrders:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Get pending products for approval
export const getPendingProducts = async (_req, res) => {
  try {
    const products = await Product.find({ approvalStatus: 'pending' })
      .sort({ createdAt: -1 });
    return res.status(200).json({ success: true, products });
  } catch (error) {
    console.error("Error in getPendingProducts:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Approve a product
export const approveProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await Product.findByIdAndUpdate(
      productId,
      {
        approvalStatus: 'approved',
        approvedAt: new Date(),
        approvedBy: req.user || 'admin'
      },
      { new: true }
    );
    
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    
    return res.status(200).json({ success: true, message: "Product approved successfully", product });
  } catch (error) {
    console.error("Error in approveProduct:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Reject a product
export const rejectProduct = async (req, res) => {
  try {
    const { productId, rejectionReason } = req.body;
    
    if (!rejectionReason) {
      return res.status(400).json({ success: false, message: "Rejection reason is required" });
    }
    
    const product = await Product.findByIdAndUpdate(
      productId,
      {
        approvalStatus: 'rejected',
        rejectionReason,
        rejectedAt: new Date()
      },
      { new: true }
    );
    
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }
    
    return res.status(200).json({ success: true, message: "Product rejected successfully", product });
  } catch (error) {
    console.error("Error in rejectProduct:", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};
