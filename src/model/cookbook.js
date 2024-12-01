const { JsonUtil, Model, Util } = require('stashook-utils');

module.exports = new class CookBookModel extends Model {

  constructor() {
    super('tix_cook_book'); // Table Name
  }

  SearchDynaQueryWithLimit(req, baseQuery) {
    if (req.body.searchTerm) {

      let searchTerm = req.body.searchTerm;
      if (searchTerm.startsWith("\"") && searchTerm.endsWith("\"")) {
        baseQuery = baseQuery + ` OR CB.description LIKE ?`;
      }
      else {
        let inSearch = searchTerm.split(" ");
        let count = 0 ;
        inSearch.forEach(element => {
          baseQuery = baseQuery + ` OR CB.description LIKE ?`;
        });
      }
    }
    console.log("::::SearchDynaQueryWithLimit:::  " + baseQuery);
    return this.SearchWithLimit(req, baseQuery);
  }

  searchData(req) {

    let searchData = [];
    searchData.push(Util.withPercent(req.body.categoryId));
    searchData.push(Util.withPercent(req.body.searchTerm));
    searchData.push(Util.withPercent(req.body.searchTerm));

    
    return searchData;

  }

  searchTraceData(req) {

    if (req.body.searchTerm) {

      let searchTerm = req.body.searchTerm;

      let searchData = [];
      if (searchTerm.startsWith("\"") && searchTerm.endsWith("\"")) {
        searchTerm = searchTerm.substring(1, searchTerm.length - 1);
        searchData.push(['']); //category
        searchData.push(['']); //keywords
        searchData.push(Util.withPercent(searchTerm)); //description
      }
      else {
        let inSearch = req.body.searchTerm.split(" ");
        console.log(":::::::inSearch:::::::" + JSON.stringify(inSearch));
        searchData.push(inSearch); //category
        searchData.push(inSearch); //keywords

        //description
        inSearch.forEach(element => {
          searchData.push(Util.withPercent(element));
        });
        //cook details description

      }
      console.log(":::::::searchData:::::::" + JSON.stringify(searchData));

      return searchData;
    }
    else
      return ['', '', '%%'];


  }

  createData(req) {
    return {
      'cookId': Util.primaryId('CBK'),
      'cookBookName': req.body.cookBookName,
      'goLinks': req.body.goLinks,  
      'categoryId': req.body.categoryId,
      'description': req.body.description,
      'keywords': req.body.keywords,
      'createdBy': req.sessionUser.employeeId,
      'createdDate': Util.getDate(),
      'modifiedBy': req.sessionUser.employeeId,
      'modifiedDate': Util.getDate(),
      'status': 0
    }
  }

  updateData(req)
  {
    let updateData = [];
    updateData.push(req.body.cookBookName);
    updateData.push(req.body.goLinks);
    updateData.push(req.body.categoryId);
    updateData.push(req.body.description);
    updateData.push(req.body.keywords);
    updateData.push(req.sessionUser.employeeId);
    updateData.push(Util.getDate());
    updateData.push(JsonUtil.unmaskField(req.body.cookId));
    
    return updateData;
  }

  blockData(req)
  {
    let updateData = [];
    updateData.push(req.body.status);
    updateData.push(req.sessionUser.employeeId);
    updateData.push(Util.getDate());
    updateData.push(JsonUtil.unmaskField(req.body.cookId));
    
    return updateData;
  }
}