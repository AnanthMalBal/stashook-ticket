var express = require('express');
var router = express.Router();
const { AuthToken } = require('stashook-utils');
const IncidentController = require('../controller/incident-controller')

const cors =require('cors');
var whitelist = ['http://localhost:4200']
let corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}
router.options('*',cors());



router.post('/searchIncident',cors(corsOptionsDelegate), AuthToken.validateToken, IncidentController.searchIncident);

router.post('/getIncident', AuthToken.validateToken, IncidentController.getIncident);

router.post('/createIncident', AuthToken.validateToken, IncidentController.createIncident, IncidentController.getIncident);

router.post('/updateIncident', AuthToken.validateToken, IncidentController.updateIncident, IncidentController.getIncident, IncidentController.incidentNotificationEmail );

module.exports = router;