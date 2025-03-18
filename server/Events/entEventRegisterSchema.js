const mongoose = require("mongoose");

const eventregisterSchema = new mongoose.Schema(
    {
        fname: {
            type: String,
            required:true
        },
        lname: {
            type: String,
            required:true
        },
        email: {
            type: String,
            required:true
        },
         contact: {
            type: Number,
            required: true,
        },
        location: {
            type: String,
            required:true
        },
        entId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'entrepreneurs',
            required:true
        },
        eventId: {
            type:mongoose.Schema.Types.ObjectId,
            ref:'events',
            required:true
        },

    })
const EntEventRegister = mongoose.model("EntrepreneurEventRegister", eventregisterSchema);

module.exports = EntEventRegister;
