var express = require('express');
var router = express.Router();
const { AuthToken } = require('stashook-utils');
const IncidentController = require('../controller/incident-controller')

router.post('/searchIncident', AuthToken.validateToken, IncidentController.searchIncident);

router.post('/getIncident', AuthToken.validateToken, IncidentController.getIncident);

router.post('/addIncident', AuthToken.validateToken, IncidentController.addIncident);

router.post('/updateIncident', AuthToken.validateToken, IncidentController.updateIncident);

router.post('/blockIncident', AuthToken.validateToken, IncidentController.blockIncident);


module.exports = router;