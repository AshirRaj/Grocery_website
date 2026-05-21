import express from "express";
import { 
  adminLogin, 
  adminLogout, 
  adminCheckAuth, 
  adminAllOrders,
  getPendingProducts,
  approveProduct,
  rejectProduct
} from "../controller/admin.controller.js";
import { authAdmin } from "../middlewares/authAdmin.js";

const router = express.Router();

router.post("/login", adminLogin);
router.get("/is-auth", authAdmin, adminCheckAuth);
router.get("/logout", authAdmin, adminLogout);

// admin orders
router.get("/orders", authAdmin, adminAllOrders);

// admin product approval
router.get("/pending-products", authAdmin, getPendingProducts);
router.post("/approve-product", authAdmin, approveProduct);
router.post("/reject-product", authAdmin, rejectProduct);

export default router;


