var express = require('express');
var router = express.Router();
const AttendanceController = require('../controller/attendance-controller')

router.post('/createAttendance', AttendanceController.addAttendance);

router.post('/updateAttendance', AttendanceController.updateAttendance);

router.post('/blockAttendance', AttendanceController.blockAttendance);

router.post('/deleteAttendance', AttendanceController.deleteAttendance);

router.post('/searchAttendance', AttendanceController.searchAttendance);

router.post('/getAttendance', AttendanceController.getAttendance);

module.exports = router;
