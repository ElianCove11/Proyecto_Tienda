import Product from "../models/product.model";

export async function getAll(req, res) {
  try {
    const plants = await Product.findAll();
    res.json({
      data: plants,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "ocurrio un problema con el servidor",
      data: [],
    });
  }
}
