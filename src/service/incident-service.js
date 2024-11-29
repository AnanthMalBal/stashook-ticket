const {Connection, JsonUtil } = require('stashook-utils');
const Queries = require('../util/queries');
const Message = require('../util/message');
const IncidentModel = require('../model/incident');
const Logger = require('../util/logger');

module.exports = {
    searchIncident: async (req, res, next) => {

        res.json("Search Incident");
    },

    addIncident: async (req, res, next) => {

        res.json("Add Incident");
    },

    updateIncident: async (req, res, next) => {

        res.json("Update Incident");
    },

    blockIncident: async (req, res, next) => {

        res.json("Block Incident");
    },

    getIncident: async (req, res, next) => {

        res.json("Get Incident");
    },
}