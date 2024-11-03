const {Util} = require('stashook-utils');

const ticketService = require('../service/ticket-service');

module.exports = {
    addTicket: async (req, res, next) => {

        try {
            ticketService.addTicket(req, res, next);
        }
        catch (excep) {
            Util.sendError500(req, res, excep);
        }
    },

    updateTicket: async (req, res, next) => {

        try {
            ticketService.updateTicket(req, res, next);
        }
        catch (excep) {
            Util.sendError500(req, res, excep);
        }
    },
    blockTicket: async (req, res, next) => { //softDelete

        try {
            ticketService.blockTicket(req, res, next);
        }
        catch (excep) {
            Util.sendError500(req, res, excep);
        }
    },
    deleteTicket: async (req, res, next) => { //hardDelete

        try {
            ticketService.deleteTicket(req, res, next);
        }
        catch (excep) {
            Util.sendError500(req, res, excep);
        }
    },
    approveTicket: async (req, res, next) => { //hardDelete

        try {
            ticketService.approveTicket(req, res, next);
        }
        catch (excep) {
            Util.sendError500(req, res, excep);
        }
    },
    searchTicket: async (req, res, next) => {

        try {
            ticketService.searchTicket(req, res, next);
        }
        catch (excep) {
            Util.sendError500(req, res, excep);
        }
    },
    getTicket: async (req, res, next) => {

        try {
            ticketService.getTicket(req, res, next);
        }
        catch (excep) {
            Util.sendError500(req, res, excep);
        }
    },
    getTicketList: async (req, res, next) => {

        try {
            ticketService.getTicketList(req, res, next);
        }
        catch (excep) {
            Util.sendError500(req, res, excep);
        }
    }

}