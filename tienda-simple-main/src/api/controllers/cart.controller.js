import Cart from "../models/cart.model";
import Product from "../models/product.model";

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findAll({
      include: [
        {
          model: Product,
            // attributes: ["name", "url_image", "price"], 
        },
      ],
      where: {
        username: req.username,
      },
        attributes: [ "quantity"],
    });
    res.json(cart);
  } catch (error) {
    res.status(500).json({
      message: "ALGO SALIO MAL  " + error.message + "\t" + error.stack,
    });
  }
};

export const addProduct = async (req, res) => {
  try {
    const { product_id, quantity } = req.body;
    const cart = await Cart.create({
      username: req.username,
      product_id,
      quantity,
    });
    res.json(cart);
  } catch (error) {
    res.status(500).json({
      message: "ALGO SALIO MAL",
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { product_id, quantity } = req.body;
    const cart = await Cart.update(
      {
        quantity,
      },
      {
        where: {
          username: req.username,
          product_id,
        },
      }
    );
    res.json(cart);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "ALGO SALIO MAL",
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await Cart.destroy({
      where: {
        username: req.username,
        product_id: id,
      },
    });
    res.json(cart);
  } catch (error) {
    res.status(500).json({
      message: "ALGO SALIO MAL",
    });
  }
};
