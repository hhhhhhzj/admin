const UserServices = require("../../services/admin/UserService");
const JWT = require("../../util/JWT");

const UserController = {
    login: async (req, res) => {
        console.log(req.body);

        //req.body
        var result = await UserServices.login(req.body)

        if (result.length === 0) {
            res.send({
                code: '-1',
                error: '用户名密码不匹配'
            })
        } else {

            //生成token     
            const token = JWT.generate({
                id: result[0].id,
                username: result[0].username,
            }, "20s")

            res.header('Authorization', token)
            res.send({
                ActionType: 'ok',
                data: {
                    username: result[0].username,
                    gender: result[0].gender ? result[0].gender : 0,//性别，0，1，2
                    introduction: result[0].introduction,
                    avatar: result[0].avatar,
                    role: result[0].role,
                }
            })
        }
    },
    upload: async (req, res) => {
        const { username, introduction, gender } = req.body
        const token = req.headers['authorization'].split(' ')[1]
        console.log('token', token);

        const avatar = req.file ? `/avataruploads/${req.file.filename}` : ''
        var payload = JWT.verify(token)
        console.log('payload.id:/n', payload.id);
        console.log(req.body, req.file);
        //调用service 模块更新 数据

        await UserServices.upload({ _id: payload.id, username, introduction, gender: Number(gender), avatar })
        if (avatar) {
            res.send({
                ActionType: 'ok',
                data: {
                    username, introduction,
                    gender: Number(gender),
                    avatar
                }
            })
        } else {
            res.send({
                ActionType: 'ok',
                data: {
                    username, introduction,
                    gender: Number(gender),
                }
            })
        }
    },
    add: async (req, res) => {
        const { username, introduction, gender, role, password } = req.body

        const avatar = req.file ? `/avataruploads/${req.file.filename}` : ''
        await UserServices.add({ username, introduction, gender: Number(gender), avatar, role: Number(role), password })
        res.send({
            ActionType: 'ok',
        })
    },
    getList: async (req, res) => {
        const result = await UserServices.getList(req.params)
        res.send({
            ActionType: 'ok',
            data: result
        })
    },
    delList: async (req, res) => {
        const result = await UserServices.delList({ _id: req.params.id })
        res.send({
            ActionType: 'ok',
        })
    },
    putList: async (req, res) => {
        const result = await UserServices.putList(req.body)
        res.send({
            ActionType: 'ok',
        })
    }
}

module.exports = UserController