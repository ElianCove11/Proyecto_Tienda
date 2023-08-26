import Sequelize  from "sequelize";
import { sequelize } from '../../config/database'

const Sale = sequelize.define("sale", {
    id: {
        type: Sequelize.STRING,
        primaryKey: true,
    },

    username: {
        type: Sequelize.STRING,
    },

    total: {
        type: Sequelize.DOUBLE,
    },

    date: {
        type: Sequelize.DATE,
        field: 'created_at'
    },

}, { timestamps: false })

Sale.associate = (models) => {
    Sale.belongsTo(models.User, { foreignKey: 'username' });
}

export default Sale;