const mongoose = require("mongoose");

const sSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required:true
        },
        description: {
            type: String,
            required:true
        },
        time: {
            type: String,
            required:true
        },
         date: {
            type: Date,
            required: true,
        },
        venue: {
            type: String,
            required:true
        },
        isActive: {
            type: Boolean,
            default: true,
        }

    },
    { timestamps: true }
);

const Message = mongoose.model("events", sSchema);

module.exports = Message;
