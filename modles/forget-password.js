const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const forgetPasswordSchema = new Schema({
    _id: {
        type: String,
        required: true,
    },
    active: {
        type: Boolean,
        default: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('ForgetPassword', forgetPasswordSchema);

// const { DataTypes } = require('sequelize');
// const sequelize = require('../util/database');

// const ForgetPassword = sequelize.define('ForgetPassword', {
//     id: {
//         type: DataTypes.UUID,
//         defaultValue: DataTypes.UUIDV4,
//         primaryKey: true
//     },
//     userId: {
//         type: DataTypes.INTEGER,
//         allowNull: false
//     },
//     active: {
//         type: DataTypes.BOOLEAN,
//         defaultValue: true
//     }
// });

// module.exports = ForgetPassword;