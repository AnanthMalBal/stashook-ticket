const { Model } = require('stashook-utils');

module.exports = new class TixCustomerModel extends Model {

  constructor() {
    super('tix_customer'); // Table Name
  }

  searchData(req) {
  }
}