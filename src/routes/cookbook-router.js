var express = require('express');
var router = express.Router();
const { AuthToken } = require('stashook-utils');
const CookController = require('../controller/cookbook-controller')

router.post('/searchCookBook', AuthToken.validateToken, CookController.searchCookBook);

router.post('/searchTraceCookBook', AuthToken.validateToken, CookController.searchTraceCookBook);

router.post('/getCookBook', AuthToken.validateToken, CookController.getCookBook);

router.post('/addCookBook', AuthToken.validateToken, CookController.addCookBook);

router.post('/updateCookBook', AuthToken.validateToken, CookController.updateCookBook);

router.post('/blockCookBook', AuthToken.validateToken, CookController.blockCookBook);

module.exports = router;