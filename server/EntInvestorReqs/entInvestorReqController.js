const InvestorReqs = require('./entInvestorReqs');

const mongoose = require('mongoose');

// Register a new Investor Request
const reqInvestorById = async (req, res) => {
    const { investorId, entId,planId} = req.body;
    var response ={};

  await InvestorReqs.find({investorId:investorId,entId:entId,planId:planId}).exec()
  .then(data=>{
    if(data.length>0)
        {
            response.status = 409;
            response.msg= "You have already requested for this Investor";
        }
  }).catch(err => {
    response.msg= "error";
  })
    try {
        if (response.status != 409) {
            const newInvestorReq = new InvestorReqs({
                date:new Date(),
                investorId,
                entId,
                planId
            });
    
            await newInvestorReq.save()
                .then(data => {
                    response ={
                        status: 200,
                        msg: "Request created successfully",
                        data: data
                    };
                })
                .catch(err => {
                    response = {
                        status: 500,
                        msg: "Request not created",
                        data: err
                    };
                });
        }
        res.json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// View Investor Request by ID
const viewInvestorReqById = (req, res) => {
    console.log(req.params.id)
    InvestorReqs.findById(req.params.id)
        .populate('investorId')
        .populate('entId')
        .populate('planId')
        .exec()
        .then(data => {
            if (data) {
                res.json({
                    status: 200,
                    msg: "Data obtained successfully",
                    data: data
                });
            } else {
                res.json({
                    status: 404,
                    msg: "Request not found"
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                msg: "Data not obtained",
                Error: err
            });
        });
};

// View Investor Request by ID
const viewInvestorReqByInvId = (req, res) => {
    InvestorReqs.find({investorId:req.params.id})
      
        .populate('entId')
        .populate('planId')
        .exec()
        .then(data => {
            if (data) {
                res.json({
                    status: 200,
                    msg: "Data obtained successfully",
                    data: data
                });
            } else {
                res.json({
                    status: 404,
                    msg: "Request not found"
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                msg: "Data not obtained",
                Error: err
            });
        });
};


// View Investor Request by ID
const viewInvestorReqByPlanId = (req, res) => {
    InvestorReqs.findOne({ planId: req.params.id })
        .populate('entId')
        .populate('planId')
        .populate('investorId')
        .exec()
        .then(data => {
            if (data) {
                res.json({
                    status: 200,
                    msg: "Data obtained successfully",
                    data: data
                });
            } else {
                res.json({
                    status: 404,
                    msg: "Request not found"
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                msg: "Data not obtained",
                Error: err
            });
        });
};

// View Investor Request by ID
const viewInvestorReqByEntId = (req, res) => {
    console.log(req.params.id)
    InvestorReqs.find({entId:req.params.id})
      
        .populate('investorId')
        .populate('entId')
        .populate('planId')
        .exec()
        .then(data => {
            if (data) {
                res.json({
                    status: 200,
                    msg: "Data obtained successfully",
                    data: data
                });
            } else {
                res.json({
                    status: 404,
                    msg: "Request not found"
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                msg: "Data not obtained",
                Error: err
            });
        });
};

// Delete Investor Request by ID
const deleteInvestorReqById = (req, res) => {
    InvestorReqs.findByIdAndDelete(req.params.id)
        .exec()
        .then(data => {
            if (data) {
                res.json({
                    status: 200,
                    msg: "Deleted successfully",
                    data: data
                });
            } else {
                res.json({
                    status: 404,
                    msg: "Request not found"
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                msg: "Data not deleted",
                Error: err
            });
        });
};


// View Investor Request by ID
const acceptInvestorReqByInvId = (req, res) => {
    InvestorReqs.findByIdAndUpdate({_id:req.params.id},{status:'accepted'})
        .exec()
        .then(data => {
            if (data) {
                res.json({
                    status: 200,
                    msg: "Data obtained successfully",
                    data: data
                });
            } else {
                res.json({
                    status: 404,
                    msg: "Request not found"
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                msg: "Data not obtained",
                Error: err
            });
        });
};

// View Investor Request by ID
const rejectInvestorReqById = (req, res) => {
    InvestorReqs.findByIdAndUpdate({_id:req.params.id},{status:'rejected'})
      
        .exec()
        .then(data => {
            if (data) {
                res.json({
                    status: 200,
                    msg: "Data obtained successfully",
                    data: data
                });
            } else {
                res.json({
                    status: 404,
                    msg: "Request not found"
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                msg: "Data not obtained",
                Error: err
            });
        });
};

// View Investor Request by ID
const viewAcceptedReqsByInvId = (req, res) => {
    InvestorReqs.find({investorId:req.params.id}).populate('entId')
      
        .exec()
        .then(data => {
            if (data) {
                res.json({
                    status: 200,
                    msg: "Data obtained successfully",
                    data: data
                });
            } else {
                res.json({
                    status: 404,
                    msg: "Request not found"
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                msg: "Data not obtained",
                Error: err
            });
        });
};
// View Investor Request by ID
const viewAcceptedReqsByEntId = (req, res) => {
    InvestorReqs.find({entId:req.params.id, status:'accepted'}).populate('investorId')
      
        .exec()
        .then(data => {
            if (data) {
                res.json({
                    status: 200,
                    msg: "Data obtained successfully",
                    data: data
                });
            } else {
                res.json({
                    status: 404,
                    msg: "Request not found"
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                status: 500,
                msg: "Data not obtained",
                Error: err
            });
        });
};
module.exports = {
    reqInvestorById,
    viewInvestorReqById,
    deleteInvestorReqById,
    viewInvestorReqByEntId,
    viewInvestorReqByInvId,
    viewAcceptedReqsByEntId,
    viewAcceptedReqsByInvId,
    acceptInvestorReqByInvId,
    rejectInvestorReqById,
    viewInvestorReqByPlanId

};
