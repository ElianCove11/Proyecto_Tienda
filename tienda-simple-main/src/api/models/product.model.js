import Sequelize  from "sequelize";
import { sequelize } from '../../config/database'

const Product = sequelize.define("product", {
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    url_image: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    price: {
        type: Sequelize.DOUBLE,

    },

}, { timestamps: false })

export default Product;