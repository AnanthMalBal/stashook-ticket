const {Util, Connection, Helper, Model} = require('../../node_modules/stashook-utils');
const Queries = require('../util/queries');
const Message = require('../util/message');
const AttendanceModel = require('../model/Attendance');

module.exports = {
    addAttendance: async (req, res, next) => {

        res.json("Add Attendance");
    },
    markAttendance: async (req, res, next) => {

        res.json("Mark Attendance");
    },
    blockAttendance: async (req, res, next) => { //softDelete

        res.json("Delete Attendance");
    },
    searchAttendance: async (req, res, next) => {

        res.json("Search Attendance");  
    },

    getAttendance: async (req, res, next) => {

        res.json("Get Attendance");  
    }
}