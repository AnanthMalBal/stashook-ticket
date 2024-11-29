const { Model } = require('stashook-utils');

module.exports = new class CookBookModel extends Model {

  constructor() {
    super('tix_cook_book'); // Table Name
  }

  searchData(req) {
  }
}