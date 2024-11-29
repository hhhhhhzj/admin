var express = require('express');
const NewsController = require('../../controllers/admin/NewsController');
//图片上传
const multer = require('multer');
const upload = multer({dest: 'public/newsuploads/'});

var NewsRouter = express.Router();

//涉及文件上传，需要加上multer
NewsRouter.post('/adminapi/news/add', upload.single('file'), NewsController.add)
NewsRouter.get('/adminapi/news/list', NewsController.getList)

module.exports = NewsRouter;