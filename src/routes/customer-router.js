var express = require('express');
var router = express.Router();
const {AuthToken} = require('stashook-utils');
const customerController = require('../controller/customer-controller')

const cors =require('cors');
var whitelist = ['http://localhost:4200']
let corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}
router.options('*',cors());


router.post('/addCustomer', cors(corsOptionsDelegate),AuthToken.validateToken, customerController.addCustomer);

router.post('/updateCustomer', AuthToken.validateToken, customerController.updateCustomer);

router.post('/blockCustomer', AuthToken.validateToken, customerController.blockCustomer); 

router.post('/deleteCustomer', AuthToken.validateToken, customerController.deleteCustomer);

router.post('/searchCustomer',cors(corsOptionsDelegate), AuthToken.validateToken, customerController.searchCustomer);  // Tabulated Data

router.post('/getCustomer', AuthToken.validateToken, customerController.getCustomer); // Single Data



module.exports = router;
