const UserModel = require("../../models/UserModel")

const UserServices = {
    login: async (username, password) => {
        //有问题
        return UserModel.find(
            username,
            password
        )
    },
    upload: async ({ _id, username, introduction, gender, avatar }) => {
        if (avatar) {
            return UserModel.updateOne({
                _id
            }, {
                username,
                introduction,
                gender,
                avatar
            })
        } else {
            return UserModel.updateOne({
                _id
            }, {
                username,
                introduction,
                gender,
            })
        }
    },

    add: async ({ username, introduction, gender, avatar, password, role }) => {
        return UserModel.create({
            username,
            introduction,
            gender,
            avatar,
            password,
            role
        })
    },

    getList: async ({id}) => {
        return id?UserModel.find({_id:id},['username','role','introduction','password']):UserModel.find({},['username','role','avatar','introduction','gender'])
    },

    delList: async ({_id}) => {
        return UserModel.deleteOne({_id})
    },

    putList: async (body)=>{
        return UserModel.updateOne({_id:body._id},body)
    },
}

module.exports = UserServices