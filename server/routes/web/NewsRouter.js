var express = require('express');
const NewsController = require('../../controllers/web/NewsController');

var NewsRouter = express.Router();


NewsRouter.get('/webapi/news/list', NewsController.getList)


module.exports = NewsRouter;