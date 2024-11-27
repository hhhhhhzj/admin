const UserModel = require("../../models/UserModel")

const UserServices = {
    login:async (username, password) => {
        //有问题
        return UserModel.find(
            username,
            password
        )
    },
    upload:async ({_id,username,introduction,gender,avatar})=>{
        return UserModel.updateOne({
            _id
        },{
            username,
            introduction,
            gender,
            avatar
        })
    }
}

module.exports = UserServices