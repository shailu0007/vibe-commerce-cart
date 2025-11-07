import Product from '../models/Product.js';

let cartItems = [];

const calculateTotal = () => {
  return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
};

const getCart = async (req, res) => {
  res.json({
    items: cartItems,
    total: calculateTotal(),
  });
};


const addToCart = async (req, res) => {
  try {
    const { productId, qty } = req.body;
    const quantity = Number(qty);

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }


    const existingItem = cartItems.find((item) => item.productId.toString() === productId);

    if (existingItem) {
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


const removeFromCart = async (req, res) => {
  const productId = req.params.id;

  cartItems = cartItems.filter((item) => item.productId.toString() !== productId);

  res.json({
    items: cartItems,
    total: calculateTotal(),
  });
};


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

