const Resignation = require("../models/resignation.model");

const Resign = async(data,id, username)=>{
    const {lwd} =data;
    try{
        if(!lwd){
            throw new Error('Last working day');
        }
    
        const lastWorkingDay = new Date(lwd);
    
        const day = lastWorkingDay.getDay();
        console.log(day);
    
        if(day == 0 || day == 6){
            throw new Error("Last working day cannot be on a weekend");
        }

        const resignation = new Resignation({
            employeeId:id,
            username:username,
            lwd:lastWorkingDay
         

        });

        await resignation.save();

        return resignation;

    }catch(e){
        console.log(e);
    }
   
}

const getResignations =async()=>{
    try{
        const resigns = await Resignation.find({});
         const d =  resigns.map(resign=>({
            _id:resign._id,
            employeeId:resign.employeeId,
            username:resign.username,
            lwd:resign.lwd,
            status:resign.status
        }))
        return d;


    }catch(e){
        throw new error(e);
    }
}

module.exports = {Resign,getResignations};