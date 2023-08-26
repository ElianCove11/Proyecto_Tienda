import Sequelize from 'sequelize';
import { sequelize } from '../../config/database'


const User = sequelize.define('user', {
    username: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
     
}, { timestamps: false })


export default User;