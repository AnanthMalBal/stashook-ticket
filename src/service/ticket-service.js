const {Connection, JsonUtil } = require('stashook-utils');
const Queries = require('../util/queries');
const Message = require('../util/message');
const TicketModel = require('../model/ticket');
const Logger = require('../util/logger');

module.exports = {

    addTicket: async (req, res, next) => {

        TicketModel.create(TicketModel.createData(req))
            .then(insResult => {
                if (insResult.affectedRows > 0) {
                    Logger.info("::Queries::Create::TicketModel:result:: " + JSON.stringify(insResult));
                    res.json(Message.HOLIDAY_ADDED_SUCCESSFULLY);
                }
            }).catch(error => {
                // Logger.error("::Queries::Create::TicketModel::error: " + error);
                res.json(Message.UNABLE_TO_ADD_HOLIDAY);
            });
    },

    updateTicket: async (req, res, next) => {

        Connection.query(Queries.UpdateTicket, TicketModel.updateData(req), function (error, results) {

            if (error || results === undefined || results.affectedRows === 0) res.json(Message.UNABLE_TO_UPDATE_HOLIDAY);
            else {
                if (results.affectedRows > 0) 
                    res.json(Message.HOLIDAY_UPDATED_SUCCESSFULLY);

            }
        });
    },

    blockTicket: async (req, res, next) => { //softDelete

        Connection.query(Queries.UpdateBlockTicket, TicketModel.blockData(req), function (error, results) {

            if (error || results === undefined || results.affectedRows === 0) res.json(Message.UNABLE_TO_BLOCK_HOLIDAY);
            else {
                if (results.affectedRows > 0) 
                    res.json(Message.HOLIDAY_BLOCKED_SUCCESSFULLY);

            }
        });
    },

    deleteTicket: async (req, res, next) => { //softDelete

        Connection.query(Queries.DeleteTicket, [JsonUtil.unmaskField(req.body.autoId)], function (error, results) {

            if (error || results === undefined || results.affectedRows === 0) res.json(Message.UNABLE_TO_DELETE_HOLIDAY);
            else {
                if (results.affectedRows > 0) 
                    res.json(Message.HOLIDAY_DELETED_SUCCESSFULLY);

            }
        });
    },

    approveTicket: async (req, res, next) => { //approveTicket

        Connection.query(Queries.UpdateApproveTicket, TicketModel.approveData(req), function (error, results) {

            if (error || results === undefined || results.affectedRows === 0) res.json(Message.UNABLE_TO_APPROVE_HOLIDAY);
            else {
                if (results.affectedRows > 0) 
                    res.json(Message.HOLIDAY_APPROVED_SUCCESSFULLY);

            }
        });
    },

    getTicket: async (req, res, next) => {

        Connection.query(Queries.GetTicketById, function (error, result) {
            if (error) res.json(Message.NO_ACTIVE_PROJECTS);
            res.json(result);
        });
    },

    searchTicket: async (req, res, next) => {

        let cThis = this;

        Connection.query(TicketModel.SearchWithLimit(req, Queries.SearchTicket), TicketModel.searchData(req), function (error, results) {
            if (error || results === undefined || results.length === 0) { 
                Logger.error("TicketModel is Error :: " + error);
                Logger.error("TicketModel is Results Undefined :: " + (results === undefined));
                TicketModel.searchResults(req, res, []);
            }
            else {
                JsonUtil.mask(results, "autoId");
                JsonUtil.bitToInt(results, "status");
                JsonUtil.dates(results, "startDate", 'DD-MM-YYYY');
                JsonUtil.dates(results, "endDate", 'DD-MM-YYYY');
                JsonUtil.dates(results, "createdDate", 'DD-MMM-YYYY HH:mm:ss');
                JsonUtil.dates(results, "modifiedDate", 'DD-MMM-YYYY HH:mm:ss');
                TicketModel.searchResults(req, res, results);
            }
        });
    },


}