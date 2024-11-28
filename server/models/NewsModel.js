const mongoose = require('mongoose');
const schema = mongoose.Schema;
//user模型===>user集合
const NewsType = {
    title:String,
    content:String,
    category:Number, //类别 0,1,2
    cover:String,//封面
    isPublish:Number,//未发布，已发布
    editTime:Date,
}
const NewsModel = mongoose.model('news',new schema(NewsType))
module.exports = NewsModel;