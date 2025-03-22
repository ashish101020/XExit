// const mongoose = require('mongoose');

// const resignationSchema = new mongoose.Schema({
//     employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     lwd: { type: Date, required: true },  // Last Working Day
//     reason: { type: String, required: true }, // Add resignation reason
//     status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" }
// }, { timestamps: true });

// module.exports = mongoose.model("Resignation", resignationSchema);



const mongoose = require("mongoose");
const User = require("../models/user.model");
const resignationSchema = new mongoose.Schema({
    employeeId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        unique:true,
    },
    username: {
        type: String
    },
    lwd:{
        type:Date,
        required:true
    },
   
    status:{
        type:String,
        enum:["pending","approved","rejected"],
        default:"pending"
    },
    submissionDate:{
        type:Date,
        default:Date.now,
    }
})


module.exports = mongoose.model("Resignation", resignationSchema);