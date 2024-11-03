var express = require('express');
var router = express.Router();
const { AuthToken } = require('stashook-utils');
const TicketsController = require('../controller/ticket-controller')
const multer = require('multer');
const moment = require('moment');

router.post('/addTicket', AuthToken.validateToken, TicketsController.addTicket);

router.post('/updateTicket', AuthToken.validateToken, TicketsController.updateTicket);

router.post('/blockTicket', AuthToken.validateToken, TicketsController.blockTicket);

router.post('/deleteTicket', AuthToken.validateToken, TicketsController.deleteTicket);

router.post('/approveTicket', AuthToken.validateToken, TicketsController.approveTicket);

router.post('/searchTicket', AuthToken.validateToken, TicketsController.searchTicket);

router.get('/getTicket', AuthToken.validateToken, TicketsController.getTicket);

module.exports = router;
