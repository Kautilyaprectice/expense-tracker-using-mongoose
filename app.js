const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user');
const expenseRoutes = require('./routes/expense');
const purchaseRoutes = require('./routes/purchase');
const premiumRoutes = require('./routes/premium');
const forgetPasswordRoutes = require('./routes/forget-password');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet({ contentSecurityPolicy: false }));

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

const accessLogStream = fs.createWriteStream(
    path.join(__dirname, 'access.log'),
    {flags: 'a'} 
);

app.use(morgan('combined', {stream: accessLogStream}));

app.use('/', userRoutes);
app.use('/', expenseRoutes);
app.use('/', purchaseRoutes);
app.use('/', premiumRoutes);
app.use('/', forgetPasswordRoutes);

app.use((req, res, next) => {
    console.log('url', req.url);
    res.sendFile(path.join(__dirname, `public/${req.url}`));
})

mongoose.connect('mongodb+srv://kautilya:Kautilya@cluster0.xafo0.mongodb.net/expense?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        app.listen(3000);
        console.log('connected!')
    })
    .catch(err => {
        console.log(err);
      });
