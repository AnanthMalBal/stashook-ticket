const {Connection, JsonUtil } = require('stashook-utils');
const Queries = require('../util/queries');
const Message = require('../util/message');
const IncidentModel = require('../model/incident');
const Logger = require('../util/logger');

module.exports = {
    searchIncident: async (req, res, next) => {

        Connection.query(IncidentModel.SearchWithLimit(req, Queries.SearchIncident), IncidentModel.searchData(req), function (error, results) {
            if (error || results === undefined || results.length === 0) { 
                Logger.error("Incident is Error :: " + error);
                Logger.error("Incident is Results Undefined :: " + (results === undefined));
                IncidentModel.searchResults(req, res, []);
            }
            else {
                JsonUtil.mask(results, "cookId");
                JsonUtil.bitToInt(results, "status");
                JsonUtil.dates(results, "createdDate", 'DD-MMM-YYYY HH:mm:ss');
                JsonUtil.dates(results, "modifiedDate", 'DD-MMM-YYYY HH:mm:ss');
                IncidentModel.searchResults(req, res, results);
            }
        });
    },

    addIncident: async (req, res, next) => {

        IncidentModel.create(IncidentModel.createData(req))
            .then(insResult => {
                if (insResult.affectedRows > 0) {
                    Logger.info("::Queries::Create::IncidentModel:result:: " + JSON.stringify(insResult));
                    res.json(Message.INCIDENT_ADDED_SUCCESSFULLY);
                }
            }).catch(error => {
                // Logger.error("::Queries::Create::IncidentModel::error: " + error);
                res.json(Message.UNABLE_TO_ADD_INCIDENT);
            });
    },

    updateIncident: async (req, res, next) => {

        Connection.query(Queries.UpdateIncident, IncidentModel.updateData(req), function (error, results) {
            if (error || results === undefined || results.affectedRows === 0) res.json(Message.UNABLE_TO_UPDATE_INCIDENT);
            else {
                if (results.affectedRows > 0) 
                    res.json(Message.INCIDENT_UPDATED_SUCCESSFULLY);

            }
        });
    },


    getIncident: async (req, res, next) => {

        Connection.query(Queries.GetIncident, [req.body.incidentId], function (error, results) {
            if (error || results === undefined || results.length === 0) { 
                Logger.error("Incident is Error :: " + error);
                Logger.error("Incident is Results Undefined :: " + (results === undefined));
                res.json("{}");
            }
            else {
                res.json(results[0]);
            }
        });
    },
}