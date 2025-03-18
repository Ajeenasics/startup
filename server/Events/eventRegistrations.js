const mongoose = require("mongoose");

const sSchema = new mongoose.Schema(
    {
        entId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'entrepreneurs'
        },
        eventId: {
            type:mongoose.Schema.Types.ObjectId,
            ref:'events'
        },
         
        

    },
    { timestamps: true }
);

const Message = mongoose.model("eventregistrationss", sSchema);

module.exports = Message;
