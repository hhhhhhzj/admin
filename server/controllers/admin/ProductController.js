const ProductService = require('../../services/admin/ProductService')
const { delList } = require('./UserController')

const ProductController = {
    add: async (req, res) => {
        // console.log(req.file,req.body);
        const cover = req.file ? `/newsuploads/${req.file.filename}` : ''
        const { title, introduction, detail } = req.body
        await ProductService.add({
            title,
            introduction,
            detail,
            cover,
            createTime: new Date()
        })
        res.send({
            ActionType: 'ok'
        })
    },

    // updateList: async (req, res) => {
    //     // console.log(req.file,req.body);
    //     const cover = req.file ? `/newsuploads/${req.file.filename}` : ''
    //     const { title, content, category, isPublish, _id } = req.body
    //     await NewsService.updateList({
    //         _id,
    //         title, content,
    //         category: Number(category),
    //         cover,
    //         isPublish: Number(isPublish),
    //         editTime: new Date()
    //     })
    //     res.send({
    //         ActionType: 'ok'
    //     })
    // },

    getList: async (req, res) => {
        const result = await ProductService.getList({ _id: req.params.id })
        res.send({
            ActionType: 'ok',
            data: result
        })
    },

    // publish: async (req, res) => {
    //     await NewsService.publish({
    //         ...req.body,
    //         editTime: new Date()
    //     })
    //     res.send({
    //         ActionType: 'ok'
    //     })
    // }, 

    delList: async (req, res) => {
        await ProductService.delList({ _id: req.params.id })
        res.send({
            ActionType: 'ok'
        })
    }
}

module.exports = ProductController