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
    addIncident: async (req, res, next) => {

        try {
            incidentService.addIncident(req, res, next);
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
    blockIncident: async (req, res, next) => { //softDelete

        try {
            incidentService.blockIncident(req, res, next);
        }
        catch (excep) {
            Util.sendError500(req, res, excep);
        }
    },
}