const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Expense = require('./expense');

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        default: 0
    }
});

userSchema.methods.getExpenses = function() {
    return Expense.find({ userId: this._id });
};

module.exports = mongoose.model('User', userSchema);

// const { Sequelize } = require('sequelize');
// const sequelize = require('../util/database');

// const User = sequelize.define('user', {

//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true
//     },
//     name: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     email: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     password: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     total: {
//         type: Sequelize.INTEGER,
//     }

// });

// module.exports = User;