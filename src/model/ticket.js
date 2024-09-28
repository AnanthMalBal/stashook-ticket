const {Util, Connection, Helper, Model} = require('../../node_modules/stashook-utils');

module.exports = new class TimesheetModel extends Model {

  constructor() {
    super('userstimesheet'); // Table Name
  }

  createData(results) {
    return { 
      'employeeId': results[0].employeeId, 
      'createdDate': Util.getDate()
    }
  }

}