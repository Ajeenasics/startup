const chat = require("./chatSchema");

const chatting = async (req, res) => {

  // Create a new message
  const message = new chat({
    msg: req.body.msg,
    from:req.body.from,
    to: req.body.to,
    entId: req.body.entId,
    mentorId: req.body.mentorId,
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
  let mentorId = req.body.mentorId;
  chat
    .find({
      // $or: [{
        mentorId: mentorId, entId: entId },
        // { rpid: parentid, parentid: rpid },
      // ],}
    )
    .sort({ date: 1 })
    .populate('mentorId')
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

