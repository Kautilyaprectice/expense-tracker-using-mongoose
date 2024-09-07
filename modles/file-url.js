const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fileUrlSchema = new Schema({
    fileUrl: {
        type: String,
        required: true
    },
    downloadDate: {
        type: Date,
        default: Date.now 
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model('fileUrl', fileUrlSchema);

// const Sequelize = require('sequelize');
// const sequelize = require('../util/database');

// const FileUrl = sequelize.define('fileUrl', {
//     id: {
//         type: Sequelize.INTEGER,
//         autoIncrement: true,
//         allowNull: false,
//         primaryKey: true
//     },
//     userId: {
//         type: Sequelize.INTEGER,
//         allowNull: false
//     },
//     fileUrl: {
//         type: Sequelize.STRING,
//         allowNull: false
//     },
//     downloadDate: {
//         type: Sequelize.DATE,
//         allowNull: false,
//         defaultValue: Sequelize.NOW
//     }
// });

// module.exports = FileUrl;