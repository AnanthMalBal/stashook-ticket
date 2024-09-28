const {Util} = require('stashook-utils');
const Message = require('../util/message');
const attendanceService = require('../service/attendance-service');

module.exports = {
    addAttendance: async (req, res, next) => {

        try {
            attendanceService.addAttendance(req, res, next);
        }
        catch (excep) {
            Util.sendError500(req, res, excep);
        }
    },
    updateAttendance: async (req, res, next) => {

        try {
            attendanceService.updateAttendance(req, res, next);
        }
        catch (excep) {
            Util.sendError500(req, res, excep);
        }
    },
    blockAttendance: async (req, res, next) => { //softDelete

        try {
            attendanceService.blockAttendance(req, res, next);
        }
        catch (excep) {
            Util.sendError500(req, res, excep);
        }
    },
    deleteAttendance: async (req, res, next) => { //hardDelete

        try {
            attendanceService.deleteAttendance(req, res, next);
        }
        catch (excep) {
            Util.sendError500(req, res, excep);
        }
    },
    searchAttendance: async (req, res, next) => {

        try {
            attendanceService.searchAttendance(req, res, next);
        }
        catch (excep) {
            Util.sendError500(req, res, excep);
        }
    }
    ,
    getAttendance: async (req, res, next) => {

        try {
            attendanceService.getAttendance(req, res, next);
        }
        catch (excep) {
            Util.sendError500(req, res, excep);
        }
    }

}