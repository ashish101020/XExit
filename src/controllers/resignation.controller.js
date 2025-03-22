
const {Resign,getResignations}= require("../services/resignation.service");
const submitResignation = async(req,res)=>{
  const id = req.user.userId;
  const username = req.user.username;
  console.log(id);
  console.log(username);
  const country = "IN";
  console.log("in the user resignation controller "+req.user.userId);
    try{
      const data = await Resign(req.body, id, username);

        res.status(200).json({
            data: {
              resignation: {
                _id: data._id,
              },
            },
          });

    }catch(e){
        res.status(401).json({
          message: e
          // message: "Last working day cannot be on a week"
        })
    }
}

const getAllResignations = async(req,res)=>{
  try{
    const data  = await getResignations();
    res.status(200).json({data:data});

  }catch(e){
    console.log("from getAllResigns" , e);
  }
}
module.exports = {submitResignation,getAllResignations};