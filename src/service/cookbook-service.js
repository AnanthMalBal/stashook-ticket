const {Connection, JsonUtil } = require('stashook-utils');
const Queries = require('../util/queries');
const Message = require('../util/message');
const CookBookModel = require('../model/cookbook');
const Logger = require('../util/logger');

module.exports = {
    searchCookBook: async (req, res, next) => {

        Connection.query(CookBookModel.SearchWithLimit(req, Queries.SearchCookBook), CookBookModel.searchData(req), function (error, results) {
            if (error || results === undefined || results.length === 0) { 
                Logger.error("CookBook is Error :: " + error);
                Logger.error("CookBook is Results Undefined :: " + (results === undefined));
                CookBookModel.searchResults(req, res, []);
            }
            else {
                JsonUtil.mask(results, "cookId");
                JsonUtil.bitToInt(results, "status");
                JsonUtil.dates(results, "createdDate", 'DD-MMM-YYYY HH:mm:ss');
                JsonUtil.dates(results, "modifiedDate", 'DD-MMM-YYYY HH:mm:ss');
                CookBookModel.searchResults(req, res, results);
            }
        });
    },

    searchTraceCookBook: async (req, res, next) => {

        Connection.query(CookBookModel.SearchDynaQueryWithLimit(req, Queries.SearchTraceCookBook), CookBookModel.searchTraceData(req), function (error, results) {
            if (error || results === undefined || results.length === 0) { 
                Logger.error("CookBook is Error :: " + error);
                Logger.error("CookBook is Results Undefined :: " + (results === undefined));
                CookBookModel.searchResults(req, res, []);
            }
            else {
                JsonUtil.mask(results, "cookId");
                JsonUtil.bitToInt(results, "status");
                CookBookModel.searchResults(req, res, results);
            }
        });
    },

    addCookBook: async (req, res, next) => {

        CookBookModel.create(CookBookModel.createData(req))
            .then(insResult => {
                if (insResult.affectedRows > 0) {
                    Logger.info("::Queries::Create::CookBookModel:result:: " + JSON.stringify(insResult));
                    res.json(Message.COOKBOOK_ADDED_SUCCESSFULLY);
                }
            }).catch(error => {
                // Logger.error("::Queries::Create::CookBookModel::error: " + error);
                res.json(Message.UNABLE_TO_ADD_COOKBOOK);
            });
    },

    updateCookBook: async (req, res, next) => {

        Connection.query(Queries.UpdateCookBook, CookBookModel.updateData(req), function (error, results) {
            if (error || results === undefined || results.affectedRows === 0) res.json(Message.UNABLE_TO_UPDATE_COOKBOOK);
            else {
                if (results.affectedRows > 0) 
                    res.json(Message.COOKBOOK_UPDATED_SUCCESSFULLY);

            }
        });
    },

    blockCookBook: async (req, res, next) => {

        Connection.query(Queries.BlockCookBook, CookBookModel.blockData(req), function (error, results) {
            if (error || results === undefined || results.affectedRows === 0) res.json(Message.UNABLE_TO_BLOCK_COOKBOOK);
            else {
                if (results.affectedRows > 0) 
                    res.json(Message.COOKBOOK_BLOCKED_SUCCESSFULLY);

            }
        });
    },

    getCookBook: async (req, res, next) => {

        Connection.query(Queries.GetCookBook, [JsonUtil.unmaskField(req.body.cookId)], function (error, results) {
            if (error || results === undefined || results.length === 0) { 
                Logger.error("CookBook is Error :: " + error);
                Logger.error("CookBook is Results Undefined :: " + (results === undefined));
                res.json("{}");
            }
            else {
                JsonUtil.mask(results, "cookId");
                JsonUtil.bitToInt(results, "status");
                JsonUtil.dates(results, "createdDate", 'DD-MMM-YYYY HH:mm:ss');
                JsonUtil.dates(results, "modifiedDate", 'DD-MMM-YYYY HH:mm:ss');
                res.json(results[0]);
            }
        });
    },
}