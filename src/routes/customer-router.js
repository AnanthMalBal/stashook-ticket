var express = require('express');
var router = express.Router();
const {AuthToken} = require('stashook-utils');
const customerController = require('../controller/customer-controller')

router.post('/createCustomer', AuthToken.validateToken, customerController.addCustomer);

router.post('/updateCustomer', AuthToken.validateToken, customerController.updateCustomer);

router.post('/blockCustomer', AuthToken.validateToken, customerController.blockCustomer); 

router.post('/deleteCustomer', AuthToken.validateToken, customerController.deleteCustomer);

router.post('/searchCustomer', AuthToken.validateToken, customerController.searchCustomer);  // Tabulated Data

router.post('/getCustomer', AuthToken.validateToken, customerController.getCustomer); // Single Data



module.exports = router;
