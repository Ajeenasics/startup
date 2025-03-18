const chat = require("./investorChat");

const chatting = async (req, res) => {

  // Create a new message
  const message = new chat({
    msg: req.body.msg,
    from:req.body.from,
    to: req.body.to,
    entId: req.body.entId,
    investorId: req.body.investorId,
       date:new Date()
  });
  await message
    .save()

    .then((data) => {
      res.json({
        status: 200,
        msg: "Inserted successfully",
        data: data,
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Data not Inserted",
        Error: err,
      });
    });
};

const viewChatMsgs = (req, res) => {
  let entId = req.body.entId;
  let investorId = req.body.investorId;
  chat
    .find({
      // $or: [{
        investorId: investorId, entId: entId },
        // { rpid: parentid, parentid: rpid },
      // ],}
    )
    .sort({ date: 1 })
    .populate('investorId')
    .populate('entId')
    .exec()
    
    .then((data) => {
      res.json({
        status: 200,
        msg: "got it successfully",
        data: data,
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        msg: "Data not obtained",
        Error: err,
      });
    });
};

module.exports = {
  chatting,
 viewChatMsgs
  
};

