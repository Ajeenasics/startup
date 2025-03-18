const express = require("express");
const router = express.Router();
const Subscription = require("./subscriptionSchema"); // Adjust the path to your actual file

// Add a new subscription
const addSubscription = async (req, res) => {
    try {
        const { entId, mentorId, amount,paymentstatus } = req.body;
let flag=0
        const newSubscription = new Subscription({
            entId,
            mentorId,
            date:new Date(),
            amount,
            paymentstatus
        });
await Subscription.find({entId,mentorId}).then(data=>{
    if(data.length>0)
    flag=1
}).catch(err=>{
    console.log(err);
})
if(flag==0){
       await newSubscription
            .save()
            .then((data) => {
                res.status(200).json({
                    msg: "Inserted successfully",
                    data: data
                });
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json({
                    msg: "Data not Inserted",
                    data: err
                });
            });
        }
        else{
            res.status(409).json({
                msg: "You Have Already Subscribed to this Mentor",
            });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// View all subscriptions
const viewSubscriptions = (req, res) => {
    Subscription.find().populate('entId').populate('mentorId')
        .exec()
        .then((data) => {
            if (data.length > 0) {
                res.status(200).json({
                    msg: "Data obtained successfully",
                    data: data
                });
            } else {
                res.status(200).json({
                    msg: "No Data obtained"
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                msg: "Data not obtained",
                Error: err
            });
        });
};

// View subscription by ID
const viewSubscriptionById = (req, res) => {
    const subId = req.params.id;
    Subscription.findById(subId).populate('entId').populate('mentorId')
        .exec()
        .then((data) => {
            res.status(200).json({
                msg: "Data obtained successfully",
                data: data
            });
        })
        .catch((err) => {
            res.status(500).json({
                msg: "No Data obtained",
                Error: err
            });
        });
};

// View subscriptions by entrepreneur ID
const viewSubscriptionsByEntrepId = (req, res) => {
    const entId = req.params.id;
    Subscription.find({ entId }).populate('mentorId')
        .exec()
        .then((data) => {
            res.status(200).json({
                msg: "Data obtained successfully",
                data: data
            });
        })
        .catch((err) => {
            res.status(500).json({
                msg: "No Data obtained",
                Error: err
            });
        });
};

// View subscriptions by entrepreneur ID
const viewSubscriptionsByMentorId = (req, res) => {
    const mentorId = req.params.id;
    Subscription.find({ mentorId }).populate('entId')
        .exec()
        .then((data) => {
            res.status(200).json({
                msg: "Data obtained successfully",
                data: data
            });
        })
        .catch((err) => {
            res.status(500).json({
                msg: "No Data obtained",
                Error: err
            });
        });
};

// Delete subscription by ID
const deleteSubscriptionById = (req, res) => {
    Subscription.findByIdAndDelete(req.params.id)
        .exec()
        .then((data) => {
            res.status(200).json({
                msg: "Data removed successfully",
                data: data
            });
        })
        .catch((err) => {
            res.status(500).json({
                msg: "No Data obtained",
                Error: err
            });
        });
};

module.exports = {
    addSubscription,
    viewSubscriptions,
    viewSubscriptionById,
    viewSubscriptionsByEntrepId,
    viewSubscriptionsByMentorId,
    deleteSubscriptionById
};
