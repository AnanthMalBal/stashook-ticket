const {Connection, JsonUtil } = require('stashook-utils');
const Queries = require('../util/queries');
const Message = require('../util/message');
const CookModel = require('../model/cookbook');
const Logger = require('../util/logger');

module.exports = {
    searchCookBook: async (req, res, next) => {

        res.json("Search CookBook");
    },

    addCookBook: async (req, res, next) => {

        res.json("Add CookBook");
    },

    updateCookBook: async (req, res, next) => {

        res.json("Update CookBook");
    },

    blockCookBook: async (req, res, next) => {

        res.json("Block CookBook");
    },

    getCookBook: async (req, res, next) => {

        res.json("Get CookBook");
    },
}