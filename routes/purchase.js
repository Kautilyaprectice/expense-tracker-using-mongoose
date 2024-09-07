const express = require('express');
const purchaseController = require('../controllers/purchase');
const authenticationMiddleware = require('../middlewares/authenticate');

const router = express.Router();

router.get('/purchase/premiumMembership', authenticationMiddleware.authenticate, purchaseController.purchasePremium);
router.post('/purchase/updateTransactionStatus', authenticationMiddleware.authenticate, purchaseController.updateTransactionStatus);
router.get('/user/premiumStatus', authenticationMiddleware.authenticate, purchaseController.updatePremiumStatus);

module.exports = router;