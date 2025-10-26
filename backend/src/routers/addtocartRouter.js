import express from "express";
import {
  startTicketPurchase,
  getCart,
  updateCart,
  removeCartItem,
  placeOrder,
  payuCallback,
  getPurchaseById,
} from "../controllers/addtocartDetailsController.js";
import { authMiddleware } from "../middleware/authUserMiddleware.js";

const router = express.Router();

router.route("/").post(authMiddleware(), startTicketPurchase);
router.route("/").get(authMiddleware(), getCart);
router.route("/:itemId").patch(authMiddleware(), updateCart);
router.route("/:itemId").delete(authMiddleware(), removeCartItem);
router.route("/place-order").post(authMiddleware(), placeOrder);
router.route("/purchase/:purchaseId").get(getPurchaseById); // No auth needed for success page

// PayU webhook (no auth needed, PayU calls this)
router.post("/payu-callback", payuCallback);

export default router;
