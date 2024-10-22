const {Util} = require('stashook-utils');
const customerService = require('../service/customer-service');

module.exports = {
    addCustomer: async (req, res, next) => {

        try {
            customerService.addCustomer(req, res, next);
        }
        catch (excep) {
            Util.sendError500(req, res, excep);
        }
    },
    updateCustomer: async (req, res, next) => {

        try {
            customerService.updateCustomer(req, res, next);
        }
        catch (excep) {
            Util.sendError500(req, res, excep);
        }
    },
    blockCustomer: async (req, res, next) => { //softDelete

        try {
            customerService.blockCustomer(req, res, next);
        }
        catch (excep) {
            Util.sendError500(req, res, excep);
        }
    },
    deleteCustomer: async (req, res, next) => { //hardDelete

        try {
            customerService.deleteCustomer(req, res, next);
        }
        catch (excep) {
            Util.sendError500(req, res, excep);
        }
    },
    searchCustomer: async (req, res, next) => {

        try {
            customerService.searchCustomer(req, res, next);
        }
        catch (excep) {
            Util.sendError500(req, res, excep);
        }
    }
    ,
    getCustomer: async (req, res, next) => {

        try {
            customerService.getCustomer(req, res, next);
        }
        catch (excep) {
            Util.sendError500(req, res, excep);
        }
    }

}