import Sequelize  from "sequelize";
import { sequelize } from '../../config/database'
import Product from "./product.model";
import User from "./user.model";

const Cart = sequelize.define("car", {
    username: {
        type: Sequelize.STRING,
        primaryKey: true,
    },

    product_id: {
        type: Sequelize.STRING,
        primaryKey: true,
    },

    quantity: {
        type: Sequelize.INTEGER,
    },

}, { timestamps: false })

Cart.belongsTo(Product, { foreignKey: "product_id" });

Cart.belongsTo(User, { foreignKey: "username" });


export default Cart;