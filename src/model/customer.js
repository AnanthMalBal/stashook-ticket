const {Util, Model } = require('stashook-utils');

module.exports = new class TixCustomerModel extends Model {

  constructor() {
    super('tix_customer'); // Table Name
  }

  searchData(req) {

    let searchData = [];
    searchData.push(Util.withPercent(req.body.searchTerm));
    searchData.push(Util.withPercent(req.body.searchTerm));
    searchData.push(Util.withPercent(req.body.searchTerm));
    return searchData;

  }


  createData(req) {
    return {
          'customerId': Util.primaryId('CST'),
          'customerName': req.body.customerName,
          'mobileNumber': req.body.mobileNumber,
          'alternateNumber': req.body.alternateNumber,
          'address':req.body.address,
          'createdBy': req.sessionUser.employeeId,
          'createdDate': Util.getDate(),
          'status': 1
        }
  }
}