const status = require("http-status");
const userService = require("./user.service");
const bcrypt = require("bcrypt");

const loginWithUsernameAndPassword = async(username,password)=>{
    console.log(username +' in the logi =n service');
    console.log(password +' in the logi =n service');
    const user = await userService.getUserByUsername(username);
    if(!user || !await user.isPasswordMatch(password)){
        throw new Error("Incorrect credentials")
    }
    return user;
}

module.exports = {loginWithUsernameAndPassword}