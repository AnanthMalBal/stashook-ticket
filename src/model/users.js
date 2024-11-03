const {Util, Model} = require('stashook-utils');

module.exports = new class UsersModel extends Model {

  constructor() {
    super('users');// Table Name
  }

  createData(results) {
    return { 
      'employeeId': results[0].employeeId, 
      'createdDate': Util.getDate()
    }
  }

}