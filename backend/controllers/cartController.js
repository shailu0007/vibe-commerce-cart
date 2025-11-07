import Product from '../models/Product.js';

// Let's use a simple in-memory array to act as our cart storage for this demo.
let cartItems = [];

// A helper function to calculate the total price
const calculateTotal = () => {
  return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
};

// @desc    Get all items from the cart
// @route   GET /api/cart
// @access  Public
const getCart = async (req, res) => {
  res.json({
    items: cartItems,
    total: calculateTotal(),
  });
};

// @desc    Add an item to the cart
// @route   POST /api/cart
// @access  Public
const addToCart = async (req, res) => {
  try {
    const { productId, qty } = req.body;
    const quantity = Number(qty);

    // Fetch product details
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    //
    // --- THIS IS THE CORRECTED LINE ---
    // We convert the ObjectId to a string before comparing.
    //
    const existingItem = cartItems.find((item) => item.productId.toString() === productId);

    if (existingItem) {
      // This block will now run correctly
      existingItem.quantity += quantity;
    } else {
      cartItems.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity,
      });
    }

    res.status(201).json({
      items: cartItems,
      total: calculateTotal(),
    });
  } catch (error) {
    console.error("Error in addToCart:", error);
    res.status(500).json({ message: 'Server Error' });
  }
};

// @desc    Remove an item from the cart
// @route   DELETE /api/cart/:id
// @access  Public
const removeFromCart = async (req, res) => {
  const productId = req.params.id;

  // Filter the cart, keeping all items except the one with the matching productId
  cartItems = cartItems.filter((item) => item.productId.toString() !== productId);

  res.json({
    items: cartItems,
    total: calculateTotal(),
  });
};

// @desc    Process a mock checkout
// @route   POST /api/checkout
// @access  Public
const checkout = async (req, res) => {
  const { cartItems: checkoutItems } = req.body;

  if (!checkoutItems || checkoutItems.length === 0) {
    return res.status(400).json({ message: 'Cart is empty' });
  }

  const total = checkoutItems.reduce((t, item) => t + item.price * item.quantity, 0);

  const receipt = {
    total: total,
    timestamp: new Date().toISOString(),
    items: checkoutItems.map(item => ({ name: item.name, quantity: item.quantity })),
  };

  cartItems = [];

  res.status(200).json(receipt);
};

export { getCart, addToCart, removeFromCart, checkout };

