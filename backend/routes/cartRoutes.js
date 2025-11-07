import express from 'express';
// 1. Make sure `addToCart` is imported from the controller
import {
  getCart,
  addToCart,
  removeFromCart,
  checkout,
} from '../controllers/cartController.js';

const router = express.Router();

// 2. This line MUST include `.post(addToCart)` to handle the POST request.
router.route('/').get(getCart);
router.route('/add-cart').post(addToCart);
// This handles DELETE requests to /api/cart/:id
router.route('/:id').delete(removeFromCart);

// This handles POST requests to /api/cart/checkout
router.post('/checkout', checkout);

export default router;
