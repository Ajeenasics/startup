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
    mentorId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "mentors"
    
    },
    date:{
      type: Date,
      required: true,
    }

  },
  { timestamps: true }
);

const Message = mongoose.model("chats", messageSchema);

module.exports = Message;
