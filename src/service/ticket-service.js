const {Util, Connection, Helper, Model} = require('stashook-utils');
const Queries = require('../util/queries');
const Message = require('../util/message');
const TicketModel = require('../model/Ticket');

module.exports = {
    addTicket: async (req, res, next) => {

        res.json("Add Ticket");
    },
    markTicket: async (req, res, next) => {

        res.json("Mark Ticket");
    },
    blockTicket: async (req, res, next) => { //softDelete

        res.json("Delete Ticket");
    },
    searchTicket: async (req, res, next) => {

        res.json("Search Ticket");  
    },

    getTicket: async (req, res, next) => {

        res.json("Get Ticket");  
    }
}