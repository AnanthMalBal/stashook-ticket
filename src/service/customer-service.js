const {Util, Connection, Model} = require('stashook-utils');
const Queries = require('../util/queries');
const Message = require('../util/message');
const CustomerModel = require('../model/customer');

module.exports = {
    addCustomer: async (req, res, next) => {

        res.json("Add Customer");
    },
    markCustomer: async (req, res, next) => {

        res.json("Mark Customer");
    },
    blockCustomer: async (req, res, next) => { //softDelete

        res.json("Delete Customer");
    },
    searchCustomer: async (req, res, next) => {

        res.json("Search Customer");  
    },

    getCustomer: async (req, res, next) => {

        res.json("Get Customer");  
    }
}