const { Connection, JsonUtil, Util, Logger, EmailService, ConfigQuery } = require('stashook-utils');
const Queries = require('../util/incident-queries');
const Message = require('../util/message');
const IncidentModel = require('../model/incident');
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
                    req.body.action = 'Create';
                    req.body.notify = false;
                    next(); // Required to Call getIncident. Check incident-router.js
                }
            }).catch(error => {
                // Logger.error("::Queries::Create::IncidentModel::error: " + error);
                res.json(Message.UNABLE_TO_CREATE_INCIDENT);
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

                if (req.body.action === 'Create')
                    res.json(results[0]);
                if (req.body.notify) {
                    req.body.incident = results[0]; // Sending Details To Notification
                    next();
                }
            }
        });
    },

    updateIncident: async (req, res, next) => {

        Connection.query(Queries.UpdateIncident, IncidentModel.updateData(req), function (error, results) {
            if (error || results === undefined || results.affectedRows === 0) {
                Logger.error("UpdateIncident is Error :: " + error);
                Logger.error("UpdateIncident is Results Undefined :: " + (results === undefined));
                res.json(Message.UNABLE_TO_UPDATE_INCIDENT);
            }
            else {
                if (results.affectedRows > 0) {
                    req.body.action = 'Update';
                    req.body.notify = true;
                    res.json(Message.INCIDENT_UPDATED_SUCCESSFULLY);
                }
            }
            next(); // Required to Call getIncident. Check incident-router.js
        });
    },

    incidentNotificationEmail: async (req, res, next) => {
        Connection.query(ConfigQuery.MessageUserGroup, ['Email', 'IncidentEmailGroup'], function (error, results) {
            if (error || results === undefined || results.length === 0) {
                Logger.error("Incident Notification Email is Error :: " + error);
                Logger.error("Incident Notification Email is Results Undefined :: " + (results === undefined));
            }
            else if (results && results.length > 0) {
                req.body.config = {};
                req.body.config.key = 'IncidentUpdateNotification';//Key For Producer Property Cache
                req.body.config.property = 'SupportEmail';
                req.body.email = {};
                req.body.messageId = results[0].messageId;
                req.body.email.to = results[0].toGroup;
                req.body.email.cc = results[0].ccGroup;
                req.body.email.bcc = results[0].bccGroup;
                req.body.email.keyBaseName = 'incident';
                //Email/SMS/WhatsApp Template need dataMap to render message with data
                req.body.email.dataMap = {
                    "incidentId": req.body.incident.incidentId,  // In Email Template {{incident.incidentId}}; i.e. keyBaseName as Start
                    "customerName": req.body.incident.customerName,
                    "description": req.body.incident.description,
                    "priority": req.body.incident.priority,
                    "modifiedDate": req.body.incident.modifiedDate,
                    "cookBookName": req.body.incident.cookBookName ? req.body.incident.cookBookName : '',
                    "supportType": req.body.incident.supportType,
                    "taskStatus": req.body.incident.taskStatus,
                };
                req.body.incident = undefined; // On Purpose

                EmailService.sendEmail(req, res, next);
            }
        });
    }
}

function inHoursMins(num) {
    if (num) {
        let days = 0;
        let hours = Math.floor(num / 60);
        let minutes = num % 60;

        if (hours >= 24) {
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
    });

}