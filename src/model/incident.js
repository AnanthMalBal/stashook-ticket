const {Util, Model } = require('stashook-utils');
const moment = require('moment');
const e = require('express');

module.exports = new class TixIncidentModel extends Model {

  constructor() {
    super('tix_incident'); // Table Name
  }

  searchData(req) {
    let searchData = [];
    searchData.push(Util.withPercent(req.body.searchTerm));
    searchData.push(Util.withPercent(req.body.searchTerm));
    searchData.push(Util.withPercent(req.body.searchTerm));
    searchData.push(Util.withPercent(req.body.searchTerm));
    searchData.push(Util.withPercent(req.body.searchTerm));
    searchData.push(Util.withPercent(req.body.searchTerm));
    return searchData;
  }

  createData(req) {
    return {
      'incidentId': Util.primaryId('INC'),
      'cookId': req.body.cookId,
      'customerId': req.body.customerId,
      'supportType': req.body.supportType, //Internal/External
      'description': req.body.description,
      'taskStatus': 'Open', //Open/Accepted/Transformed
      'priority' : 'Low', //Low/Medium/High/Urgent
      'taskDuration': 0,
      'createdBy': req.sessionUser.employeeId,
      'createdDate': Util.getDate(),
      'modifiedBy': req.sessionUser.employeeId,
      'modifiedDate': Util.getDate()
    }
  }

  updateData(req) {

    const startDate = moment(req.body.startDateTime);
    const endDate = moment(new Date());

    let minutes = endDate.diff(startDate, 'minutes') ;

    let updateData = [];
    updateData.push(req.body.cookId);
    updateData.push(req.body.supportType);
    updateData.push(req.body.priority);
    updateData.push(req.body.description);
    updateData.push((req.body.supportType === 'Internal') ? 'Accepted' : 'Transformed');
    updateData.push(minutes);
    updateData.push(req.sessionUser.employeeId);
    updateData.push(Util.getDate());
    updateData.push(req.body.incidentId);

    return updateData ;
  }
}

