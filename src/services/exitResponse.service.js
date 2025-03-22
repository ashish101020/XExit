const ExitResponse = require("../models/exitResponse.model");

const submitExitResponse = async(data, userId)=>{
    try{
        const {responses} = data;
        console.log("in responce service", data);
        console.log("in responce service", responses);
        
        if(!responses || !Array.isArray(responses)){
            throw new Error("Responses are required and must be an array.")
        }

        const exitResponse = new ExitResponse({
            employeeId: userId,
            responses
        })

        await exitResponse.save();
        return exitResponse;

    }catch(e){
        throw new Error(e);

    }
}

module.exports = {submitExitResponse};