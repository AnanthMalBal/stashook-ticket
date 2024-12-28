const { Connection, JsonUtil, Util } = require('stashook-utils');
const Queries = require('../util/incident-queries');
const Message = require('../util/message');
const IncidentModel = require('../model/incident');
const Logger = require('../util/logger');
const moment = require('moment');

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
                JsonUtil.format(results, 'taskDuration', inHoursMins);
                JsonUtil.dates(results, "createdDate", 'DD-MMM-YYYY HH:mm:ss');
                JsonUtil.dates(results, "modifiedDate", 'DD-MMM-YYYY HH:mm:ss');
                IncidentModel.searchResults(req, res, results);
            }
        });
    },

    createIncident: async (req, res, next) => {

        IncidentModel.create(IncidentModel.createData(req), "incidentId")
            .then(insResult => {
                if (insResult.affectedRows > 0) {
                    Logger.info("::Queries::Create::IncidentModel:result:: " + JSON.stringify(insResult));
                    req.body.incidentId = insResult.insertId;
                    next(); // Required to Call getIncident. Check incident-router.js
                }
            }).catch(error => {
                // Logger.error("::Queries::Create::IncidentModel::error: " + error);
                res.json(Message.UNABLE_TO_ADD_INCIDENT);
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
                JsonUtil.format(results, "taskDuration", inHoursMins);
                createdDateAsStartDateTime(results); // Dont Change Position
                JsonUtil.dates(results, "createdDate", 'DD-MMM-YYYY HH:mm:ss');
                JsonUtil.dates(results, "modifiedDate", 'DD-MMM-YYYY HH:mm:ss');

                res.json(results[0]);
            }
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
}

function inHoursMins(num) {
    if (num) {
        let days = 0;
        let hours = Math.floor(num / 60);
        let minutes = num % 60;

        if (hours >= 24) {
            console.log("::actual::: " + hours);
            days = Math.floor(hours / 24);
            hours = hours % 24;
        }

        if ((hours + '').length < 2) {
            hours = '0' + hours;
        }

        if ((minutes + '').length < 2) {
            minutes = '0' + minutes;
        }
        let duration = '';
        if (days > 0) {
            duration = days + ' days ';
            duration += hours + ' hrs ';
        }
        else if (hours > 0)
            duration += hours + ' hrs ';

        duration += minutes + ' mts';

        return duration;

    }
    return "0 mts";
}

function createdDateAsStartDateTime(results) {
    results.forEach(row => {
        let value = row["createdDate"];
        if (value !== undefined && value !== null)
            row['startDateTime'] = moment(value).format('YYYY-MM-DD HH:mm:ss');
        else
            row['startDateTime'] = Util.getDate();
        // console.log(">>>>dates>>>>>row[field] >>>>>>> " +  row[field]);
    });

}