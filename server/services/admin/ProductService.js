const ProductModel = require("../../models/ProductModel")

const ProductService = {
    add: async ({ title, introduction, detail, cover, editTime }) => {
        return ProductModel.create({
            title,
            introduction,
            detail,
            cover,
            editTime
        })
    },

    // updateList: async ({ _id, title, content, category, cover, isPublish, editTime})=>{
    //     if(cover){
    //         return NewsModel.updateOne({_id},{
    //             title,
    //             content,
    //             category,
    //             cover,
    //             isPublish,
    //             editTime
    //         })
    //     }else{
    //         return NewsModel.updateOne({_id},{
    //             title,
    //             content,
    //             category,
    //             isPublish,
    //             editTime
    //         })
    //     }
    // },

    // getList: async ({_id}) => {
    //     return _id? NewsModel.find({_id}) : NewsModel.find({})
    // },

    // publish: async ({ _id, isPublish, editTime }) => {
    //     return NewsModel.updateOne({
    //         _id
    //     }, {
    //         isPublish,
    //         editTime
    //     })
    // },

    // delList: async ({ _id }) => {
    //     return NewsModel.deleteOne({
    //         _id
    //     })
    // }
}

module.exports = ProductService    