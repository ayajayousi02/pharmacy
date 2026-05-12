const Cart = require("../models/Cart");

exports.addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = new Cart({
      user: userId,
      items: []
    });
  }

  const itemIndex = cart.items.findIndex(
    item => item.product.toString() === productId
  );

  if (itemIndex > -1) {
    cart.items[itemIndex].quantity += quantity;
  } else {
    cart.items.push({
      product: productId,
      quantity
    });
  }

  await cart.save();

  res.json(cart);
};

exports.getCart = async (req, res) => {
  const cart = await Cart.findOne({
    user: req.params.userId
  }).populate("items.product");

  res.json(cart);
};

exports.removeFromCart = async (req, res) => {
  const { userId, productId } = req.body;

  const cart = await Cart.findOne({ user: userId });

  cart.items = cart.items.filter(
    item => item.product.toString() !== productId
  );

  await cart.save();

  res.json(cart);
};