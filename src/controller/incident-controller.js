const {Util} = require('stashook-utils');
const incidentService = require('../service/incident-service');

module.exports = {
    searchIncident: async (req, res, next) => {

        try {
            incidentService.searchIncident(req, res, next);
        }
        catch (excep) {
            Util.sendError500(req, res, excep);
        }
    },
    createIncident: async (req, res, next) => {

        try {
            incidentService.createIncident(req, res, next);
        }
        catch (excep) {
            Util.sendError500(req, res, excep);
        }
    },
    getIncident: async (req, res, next) => {

        try {
            incidentService.getIncident(req, res, next);
        }
        catch (excep) {
            Util.sendError500(req, res, excep);
        }
    },
    
    updateIncident: async (req, res, next) => {

        try {
            incidentService.updateIncident(req, res, next);
        }
        catch (excep) {
            Util.sendError500(req, res, excep);
        }
    },

    incidentNotificationEmail: async (req, res, next) => {

        try {
            incidentService.incidentNotificationEmail(req, res, next);
        }
        catch (excep) {
            Util.sendError500(req, res, excep);
        }
    },
}