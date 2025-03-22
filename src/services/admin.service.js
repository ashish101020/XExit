const {User} = require("../models/user.model");
const Resignation = require("../models/resignation.model");
const ExitResponse = require("../models/exitResponse.model");
const bcrypt = require("bcrypt");

const initialiseAdminAccount = async () => {
  console.log("InitialiseAdminAccount function invoked");
  try {
      const existingHr = await User.findOne({ role: "HR" });
      console.log("Existing HR:", existingHr);

      if (!existingHr) {
          // const hashedPassword = await bcrypt.hash("admin", 10);
          // console.log("Hashed Password:", hashedPassword);

          const user = new User({
              role: "HR",
              username: "admin",
              password: "admin",
          });
          console.log("Admin User Object:", user);

          const savedUser = await user.save();
          console.log("Admin Account Created:", savedUser);
      }
  } catch (error) {
      console.error("Error in initialiseAdminAccount:", error);
  }
};
``

const conclude_resignation = async (data) => {
  try{
    const {resignationId,approved,lwd} = data;
    const resignation = await Resignation.findOne({_id:resignationId});

    if(!resignation){
      throw new Error("Resignation not found.")
    }

    if(approved){
      if(!lwd){
        throw new Error("Last working day (lwd) is required for approval.")
      }
    

    resignation.status = "approved";
    resignation.lwd = new Date(lwd);
    }else{
      resignation.status = "rejected";
    }

    await resignation.save();

    return resignation;

  }catch(e){
    throw new Error(e);

  }
}

const getAllExitResponses = async (data) => {
  try{
    const exitResponses = await ExitResponse.find({});

    const d = exitResponses.map(response => ({
      employeeId:response.employeeId,
      responses:response.responses
    }))

    return d;

  }catch(e){
    console.log(e);

  }
}


module.exports = {conclude_resignation,getAllExitResponses,initialiseAdminAccount};