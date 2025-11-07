import Product from '../models/Product.js'; // Import the model

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  try {
    // Use the Product model to find all documents in its collection
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Export the function so our routes can use it
export { getProducts };
