const {JsonUtil, Connection} = require('stashook-utils');
const Queries = require('../util/customer-queries');
const Message = require('../util/message');
const CustomerModel = require('../model/customer');
const Logger = require('../util/logger');

module.exports = {
    addCustomer: async (req, res, next) => {
        //UI Team Need To Check Mobile Number By using Get Customer API If Exists Before Calling Add Customer
        CustomerModel.create(CustomerModel.createData(req))
        .then(insResult => {
            if (insResult.affectedRows > 0) {
                Logger.info("::Queries::Create::CustomerModel:result:: " + JSON.stringify(insResult));
                res.json(Message.CUSTOMER_ADDED_SUCCESSFULLY);
            }
        }).catch(error => {
            // Logger.error("::Queries::Create::CustomerModel::error: " + error);
            res.json(Message.UNABLE_TO_ADD_CUSTOMER);
        });
    },

    searchCustomer: async (req, res, next) => {

        Connection.query(CustomerModel.SearchWithLimit(req, Queries.SearchCustomer), CustomerModel.searchData(req), function (error, results) {
            if (error || results === undefined || results.length === 0) { 
                Logger.error("Customer is Error :: " + error);
                Logger.error("Customer is Results Undefined :: " + (results === undefined));
                CustomerModel.searchResults(req, res, []);
            }
            else {
                JsonUtil.mask(results, "customerId");
                JsonUtil.bitToInt(results, "status");
                JsonUtil.dates(results, "createdDate", 'DD-MMM-YYYY HH:mm:ss');
                CustomerModel.searchResults(req, res, results);
            }
        });
    },

    getCustomer: async (req, res, next) => {
        
        let customerId = req.body.customerId ? JsonUtil.unmaskField(req.body.customerId) : '';

        let customerNameMobileNo = req.body.customerNameMobileNo ? req.body.customerNameMobileNo : customerId ;

        Connection.query(Queries.GetCustomerNameOrMobile, [customerId, customerNameMobileNo, customerNameMobileNo], function (error, results) {

            if (error || results === undefined || results.length === 0) { 
                Logger.error("Customer is Error :: " + error);
                Logger.error("Customer is Results Undefined :: " + (results === undefined));
                res.json("{}");
            }
            else {
                JsonUtil.mask(results, "customerId");
                JsonUtil.bitToInt(results, "status");
                JsonUtil.dates(results, "createdDate", 'DD-MMM-YYYY HH:mm:ss');
                res.json(results);
            }
        });
    }
}