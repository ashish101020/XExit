const {conclude_resignation,getAllExitResponses,initialiseAdminAccount} = require("../services/admin.service")
const concludeResignation = async(req,res)=>{
    try{
        const data = await conclude_resignation(req.body);
        res.status(200).json({ message: `Resignation ${data.approved ? "approved" : "rejected"} successfully.` })

    }catch(e){
        res.status(401).send(e);
    }
}

const getAllExitresponses = async(req,res)=>{
    try{
        const data = await getAllExitResponses(req.body);
        res.status(200).json({data:data});

    }catch(e){
        console.log(e);
    }
}
module.exports = {concludeResignation,getAllExitresponses};