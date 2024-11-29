const mongoose = require('mongoose');
const schema = mongoose.Schema;
//user模型===>user集合
const ProductType = {
    title:String,
    introduction:String,
    detail:String,
    cover:String,
    editTime:Date,
}
const ProductModel = mongoose.model('product',new schema(ProductType))
module.exports = ProductModel;