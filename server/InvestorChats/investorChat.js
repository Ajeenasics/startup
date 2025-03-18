const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    msg: {
      type: String,
      required: true,
      
    },
    from: {
      type: String,
      required: true,
    },
    to: {
      type: String,
      required: true,
    },
   entId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "entrepreneurs"
    },
    investorId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "investors"
    
    },
    date:{
      type: Date,
      required: true,
    }

  },
  { timestamps: true }
);

const Message = mongoose.model("investorchats", messageSchema);

module.exports = Message;
