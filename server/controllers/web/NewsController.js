const NewsService = require('../../services/web/NewsService')

const NewsController = {
    
    getList: async (req, res) => {
        const result = await NewsService.getList({ _id: req.params.id })
        res.send({
            ActionType: 'ok',
            data: result
        })
    },

}

module.exports = NewsController