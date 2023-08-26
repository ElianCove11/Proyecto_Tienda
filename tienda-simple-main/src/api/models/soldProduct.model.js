import Sequelize from "sequelize";
import { sequelize } from "../../config/database";

const SoldProduct = sequelize.define(
  "sold_product",
  {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    product_id: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    sale_id: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    total: {
      type: Sequelize.DOUBLE,
      allowNull: false,
    },
    quantity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  },
  { timestamps: false }
);

SoldProduct.associate = (models) => {
  SoldProduct.belongsTo(models.Sale, { foreignKey: "sale_id" });
  SoldProduct.belongsTo(models.Product, { foreignKey: "product_id" });
};

export default SoldProduct;
