import TicketPurchase from "../models/addtocartModel.js";
import {sendOrderConfirmationEmail } from "../lib/emailService.js"

// Start Ticket Purchase (save info, status: pending)
export const startTicketPurchase = async (req, res) => {
  try {
    const userId = req.user._id;
    const {
      name,
      companyName,
      streetAddress,
      apartmentAddress,
      town,
      phone,
      email,
      ticket,
      ticketPrice,
      quantity,
      gift,
      coupon,
    } = req.body;

    const purchase = new TicketPurchase({
      user: userId,
      name,
      companyName,
      streetAddress,
      apartmentAddress,
      town,
      phone,
      email,
      ticket,
      ticketPrice,
      quantity,
      gift,
      coupon,
      status: "pending",
    });

    await purchase.save();
    res.status(201).json({ success: true, purchase });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// PayU webhook callback (payment confirmation)
export const payuCallback = async (req, res) => {
  try {
    const { orderId, paymentStatus, userEmail, ticketName, quantity, totalPrice } = req.body;

    if (paymentStatus === "success") {
      const purchase = await TicketPurchase.findById(orderId).populate("ticket");
      if (!purchase) return res.status(404).send("Purchase not found");

      purchase.status = "confirmed";
      await purchase.save();

      const emailHtml = `
        <h2>Ticket Purchase Confirmation - Order ID: ${orderId}</h2>
        <p>Thank you for buying the ticket <b>${purchase.ticket.name}</b>!</p>
        <p>Quantity: ${purchase.quantity}</p>
        <p>Total Price Paid: ₹${purchase.totalPrice}</p>
      `;

      await sendOrderConfirmationEmail(userEmail, "Your Ticket Purchase Confirmation", emailHtml);
      res.status(200).send("Payment processed and email sent");
    } else {
      res.status(400).send("Payment failed");
    }
  } catch (error) {
    console.error("PayU webhook error:", error);
    res.status(500).send("Internal Server Error");
  }
};


// Get user cart/orders
export const getCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const carts = await AddToCart.find({ user: userId })
      .populate("tickets.ticket")
      .populate("products.product");

    res.status(200).json({ success: true, carts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update cart item quantity, address etc.
export const updateCart = async (req, res) => {
  try {
    const cartId = req.params.itemId;
    const updateData = req.body;

    const updatedCart = await AddToCart.findByIdAndUpdate(cartId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedCart) return res.status(404).json({ success: false, message: "Cart not found" });

    res.status(200).json({ success: true, cart: updatedCart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Remove item from cart OR cancel cart
export const removeCartItem = async (req, res) => {
  try {
    const cartId = req.params.itemId;

    const deletedCart = await AddToCart.findByIdAndDelete(cartId);
    if (!deletedCart) return res.status(404).json({ success: false, message: "Cart not found" });

    res.status(200).json({ success: true, message: "Cart removed" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Place order: Generate PayU payment request
export const placeOrder = async (req, res) => {
  try {
    const { purchaseId } = req.body;
    const purchase = await TicketPurchase.findById(purchaseId);

    if (!purchase) return res.status(404).json({ success: false, message: "Purchase not found" });

    // PayU configuration - you need to add these to your environment variables
    const PAYU_KEY = process.env.PAYU_KEY || "gtKFFx";
    const PAYU_SALT = process.env.PAYU_SALT || "eCwWELxi";
    const PAYU_SUCCESS_URL = process.env.PAYU_SUCCESS_URL || "http://localhost:5173/payment-success";
    const PAYU_FAILURE_URL = process.env.PAYU_FAILURE_URL || "http://localhost:5173/payment-failure";

    // Generate unique transaction ID
    const txnid = `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Calculate total amount (in paise for PayU)
    const amount = Math.round(purchase.totalPrice * 100);
    
    // Product info
    const productinfo = `Ticket: ${purchase.ticket?.name || 'Travel Ticket'}`;
    
    // Generate hash for PayU
    const hashString = `${PAYU_KEY}|${txnid}|${amount}|${productinfo}|${purchase.name}|${purchase.email}|||||||||||${PAYU_SALT}`;
    const crypto = require('crypto');
    const hash = crypto.createHash('sha512').update(hashString).digest('hex');

    // PayU payment request data
    const paymentRequest = {
      key: PAYU_KEY,
      txnid: txnid,
      amount: amount,
      productinfo: productinfo,
      firstname: purchase.name,
      email: purchase.email,
      phone: purchase.phone,
      surl: PAYU_SUCCESS_URL,
      furl: PAYU_FAILURE_URL,
      hash: hash,
      actionUrl: "https://secure.payu.in/_payment" // PayU test URL
    };

    // Update purchase with transaction ID
    purchase.txnid = txnid;
    purchase.status = "pending_payment";
    await purchase.save();

    res.status(200).json({ 
      success: true, 
      message: "Payment request generated", 
      paymentRequest 
    });
  } catch (error) {
    console.error("Place order error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get purchase by ID or transaction ID (for success page)
export const getPurchaseById = async (req, res) => {
  try {
    const { purchaseId } = req.params;
    
    // Try to find by purchaseId first, then by txnid
    let purchase = await TicketPurchase.findById(purchaseId)
      .populate("ticket")
      .populate("user", "name email");

    // If not found by ID, try to find by txnid
    if (!purchase) {
      purchase = await TicketPurchase.findOne({ txnid: purchaseId })
        .populate("ticket")
        .populate("user", "name email");
    }

    if (!purchase) {
      return res.status(404).json({ 
        success: false, 
        message: "Purchase not found" 
      });
    }

    res.status(200).json({ 
      success: true, 
      purchase 
    });
  } catch (error) {
    console.error("Get purchase error:", error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
};

