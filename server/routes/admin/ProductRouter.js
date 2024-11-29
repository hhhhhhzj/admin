var express = require('express');
const ProductController = require('../../controllers/admin/ProductController');
//图片上传
const multer = require('multer');
const upload = multer({dest: 'public/productuploads/'});

var ProductRouter = express.Router();

//涉及文件上传，需要加上multer
ProductRouter.post('/adminapi/product/add', upload.single('file'), ProductController.add)
// NewsRouter.post('/adminapi/news/list', upload.single('file'), NewsController.updateList)
// NewsRouter.get('/adminapi/news/list', NewsController.getList)
// NewsRouter.get('/adminapi/news/list/:id', NewsController.getList)
// NewsRouter.put('/adminapi/news/publish', NewsController.publish)
// NewsRouter.delete('/adminapi/news/list/:id', NewsController.delList)

module.exports = ProductRouter;