const Cart = require('../models/cartModel');

createCart = async (req, res) => {
  const { client_id, product_id, size } = req.body;

  try {
    // Check if the product already exists in the cart
    const cart = await Cart.find({ client_id, product_id, size });

    // If cart item already exists, respond with an error
    if (cart.length > 0) {
      return res.status(400).json({ message: "Product already exists in cart" });
    }

    // Create a new cart item
    const newCartItem = await Cart.create(req.body);

    // Respond with a success message and the newly created cart item
    res.status(201).json({ message: "Added to cart successfully", newCartItem });
  } catch (error) {
    // Handle server errors
    res.status(500).json({ message: "Internal server error", error });
  }
};

const getCart = async (req, res) => {
 
  const { client_id } = req.params;
 
  try {
    // Fetch all categories

    const cart = await Cart.find(client_id).populate("product_id");
    console.log(cart);
    res.status(200).json(cart); // Send the categories as JSON response
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

module.exports = { getCart, createCart }
