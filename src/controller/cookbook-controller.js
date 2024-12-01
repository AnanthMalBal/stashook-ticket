const {Util} = require('stashook-utils');
const cookBookService = require('../service/cookbook-service');

module.exports = {
    searchCookBook: async (req, res, next) => {

        try {
            cookBookService.searchCookBook(req, res, next);
        }
        catch (excep) {
            Util.sendError500(req, res, excep);
        }
    },
    searchTraceCookBook: async (req, res, next) => {

        try {
            cookBookService.searchTraceCookBook(req, res, next);
        }
        catch (excep) {
            Util.sendError500(req, res, excep);
        }
    },
    addCookBook: async (req, res, next) => {

        try {
            cookBookService.addCookBook(req, res, next);
        }
        catch (excep) {
            Util.sendError500(req, res, excep);
        }
    },
    getCookBook: async (req, res, next) => {

        try {
            cookBookService.getCookBook(req, res, next);
        }
        catch (excep) {
            Util.sendError500(req, res, excep);
        }
    },
    updateCookBook: async (req, res, next) => {

        try {
            cookBookService.updateCookBook(req, res, next);
        }
        catch (excep) {
            Util.sendError500(req, res, excep);
        }
    },
    blockCookBook: async (req, res, next) => { //softDelete

        try {
            cookBookService.blockCookBook(req, res, next);
        }
        catch (excep) {
            Util.sendError500(req, res, excep);
        }
    },
}