const NewsService = require('../../services/admin/NewsService')

const NewsController = {
    add: async (req, res) => {
        // console.log(req.file,req.body);
        const cover = req.file?`/newsuploads/${req.file.filename}`:''
        const {title, content, category, isPublish} = req.body
        await NewsService.add({
            title,content,
            category:Number(category),
            cover,
            isPublish:Number(isPublish),
            editTime:new Date()
        })
        res.send({
            ActionType: 'ok'
        })
    },

    getList: async (req, res) => {
        const result = await NewsService.getList()
        res.send({
            ActionType: 'ok',
            data: result
        })
    }
}

module.exports = NewsController