const NewsModel = require("../../models/NewsModel")

const NewsService = {
    add: async ({ title, content, category, cover, isPublish, editTime }) => {
        return NewsModel.create({
            title,
            content,
            category,
            cover,
            isPublish,
            editTime,
        })
    },

    getList: async () => {
        return NewsModel.find({})
    },

    publish: async ({ _id, isPublish, editTime }) => {
        return NewsModel.updateOne({
            _id
        }, {
            isPublish,
            editTime
        })
    },

    delList: async ({ _id }) => {
        return NewsModel.deleteOne({
            _id
        })
    }
}

module.exports = NewsService    