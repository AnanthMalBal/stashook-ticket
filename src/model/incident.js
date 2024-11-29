const { Model } = require('stashook-utils');

module.exports = new class TixIncidentModel extends Model {

  constructor() {
    super('tix_incident'); // Table Name
  }

  searchData(req) {
  }
}