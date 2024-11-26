var express = require('express');
const UserController = require('../../controllers/admin/UserController');
var UserRouter = express.Router();
//图片上传
const multer = require('multer');
const upload = multer({dest: 'public/avataruploads/'});

/* GET home page. */
UserRouter.post('/adminapi/user/login',UserController.login)
UserRouter.post('/adminapi/user/upload',upload.single('file'),UserController.upload)
UserRouter.post('/adminapi/user/add',upload.single('file'),UserController.add)
UserRouter.get('/adminapi/user/getList',UserController.getList)

module.exports = UserRouter;
