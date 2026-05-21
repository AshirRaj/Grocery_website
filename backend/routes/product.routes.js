import express from "express";
import { authSeller } from "../middlewares/authSeller.js";
import {
  addProduct,
  changeStock,
  getProductById,
  getProducts,
  getSellerProducts,
  removeProduct,
  updateProduct 
} from "../controller/product.controller.js";
import { upload } from "../config/multer.js";

const router = express.Router();

router.post("/add-product", authSeller, upload.array("image", 4), addProduct);
router.get("/list", getProducts);
router.get("/seller-products", authSeller, getSellerProducts);
router.get("/id", getProductById);
router.post("/stock", authSeller, changeStock);
router.post("/update", authSeller, updateProduct);
router.post("/remove", authSeller, removeProduct);

export default router;