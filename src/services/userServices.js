const UserModel = require("../models/user")
class userService{
    async signUp(user_id){
        return new Promise(async (resolve, reject) => {
            try {
                const user = new UserModel({
                    user_id
                })
                await user.save()
                return resolve({ error : false, message : "Successfully sign up."})
            } catch (error) {
                return resolve({ error : true, message : "Failed to sign up."})
            }
        });
    }
}

module.exports = new userService();