import Sale from "../models/sale.model";
import Cart from "../models/cart.model";

import crypto from "node:crypto";

export const create = async (req, res) => {
  try {
    const { total } = req.body;
    const sale = await Sale.create({
      id: crypto.randomUUID(),
      username: req.username,
      total,
    });
    
    Cart.destroy({
      where: {
        username: req.username,
      },
    });
    res.json(sale);
  } catch (error) {
    res.status(500).json({
      message: "ALGO SALIO MAL",
    });
  }
};

export const findAll = async (req, res) => {
  try {
    const sales = await Sale.findAll({
      attributes: ["id", "total", "date"],
      where: {
        username: req.username,
      },
      
      order: [["date", "DESC"]],
    });

    res.json(sales);
  } catch (error) {
    res.status(500).json({
      message: "ALGO SALIO MAL",
    });
  }
};
