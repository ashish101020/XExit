// const mongoose = require('mongoose');

// const responseSchema = new mongoose.Schema({
//     employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//     responses: [{
//         questionText: String,
//         response: String
//     }]
// }, { timestamps: true });

// module.exports = mongoose.model("ExitResponse", responseSchema);



const mongoose = require("mongoose");

const exitResponseSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    responses: [
      {
        questionText: {
          type: String,
          trim: true, 
          required: true,
        },
        response: {
          type: String,
          trim: true,
          required: true,
        },
      },
    ],
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Export the model
const ExitResponse = mongoose.model("ExitResponse", exitResponseSchema);
module.exports = ExitResponse;
