require("dotenv").config();
const jwt = require('jsonwebtoken');

const generateToken = async(userId,username,type,expires,role)=>{
    let payload = {
        userId:userId,
        username:username,
        type:type,
        role:role,
        exp:expires,
        iat:Math.floor(Date.now()/1000)
    }


  console.log("Token Payload:", payload);
    let token = jwt.sign(payload, process.env.JWT_SECRET);
    return token;
}
const generateAuthToken = async(user)=>{
    const accessTokenExpires = Math.floor(Date.now()/1000) + 60*60;
    const token = await generateToken(user._id, user.username, "access",accessTokenExpires, user.role);

    // return {
    //     access:{
    //         token:token,
    //         expires:new Date(accessTokenExpires * 1000)

    //     }
    // }
    return token;
}

module.exports = {
    generateAuthToken,
    generateToken
}