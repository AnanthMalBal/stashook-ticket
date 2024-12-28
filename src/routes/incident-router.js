var express = require('express');
var router = express.Router();
const { AuthToken } = require('stashook-utils');
const IncidentController = require('../controller/incident-controller')

router.post('/searchIncident', AuthToken.validateToken, IncidentController.searchIncident);

router.post('/getIncident', AuthToken.validateToken, IncidentController.getIncident);

router.post('/createIncident', AuthToken.validateToken, IncidentController.createIncident, IncidentController.getIncident );

router.post('/updateIncident', AuthToken.validateToken, IncidentController.updateIncident);

module.exports = router;