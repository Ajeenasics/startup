const mongoose = require("mongoose");

const sSchema = new mongoose.Schema(
    {

        entId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'entrepreneurs'
        },
        mentorId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,

            ref: "mentors"

        }
        , date: {
            type: Date,
            required: true,
        },
        paymentStatus: {
            type: Boolean,
            default: false
        },
        amount: {
            type: Number,
            required: true,
        }

    },
    { timestamps: true }
);

const Message = mongoose.model("subscriptions", sSchema);

module.exports = Message;
