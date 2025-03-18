const Complaint=require('./ComplaintSchema')

// Add Entreprenuer Complaint

const entAddComplaints= async(req,res)=>{
    try{
      const{
      description,
    }=req.body;
    const newComplaint=new Complaint.entcomplaint({
      description,
      entId:req.params.id
    })
    await newComplaint.save()
      .then(data => {
        res.status(200).json({
            msg: "Complaint send successfully",
            data: data
        });
      })
      .catch(err => {
          console.log(err);
          res.status(500).json({
              msg: "Data not Send",
              data: err
          });
      });
    }catch (error) {
      console.log("err",error);
      res.status(500).json({ message: error.message });
    }
  }

  // Add Investor Complaint

const investorAddComplaints= async(req,res)=>{
    try{
      const{
      description,
    }=req.body;
    const newComplaint=new Complaint.invcomplaint({
      description,
      investorId:req.params.id
    })
    await newComplaint.save()
      .then(data => {
        res.status(200).json({
            msg: "Complaint send successfully",
            data: data
        });
      })
      .catch(err => {
          console.log(err);
          res.status(500).json({
              msg: "Data not Send",
              data: err
          });
      });
    }catch (error) {
      console.log("err",error);
      res.status(500).json({ message: error.message });
    }
  }

  // View entcomplaint 
const viewEntComplaint = (req, res) => {
  Complaint.entcomplaint.find().populate('entId')
    .exec()
    .then((data) => {
      res.status(200).json({
        msg: "Data obtained successfully",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        msg: "No Data obtained",
        Error: err,
      });
    });
};

// View investor complaint 
const viewInvestorComplaint = (req, res) => {
  Complaint.invcomplaint.find().populate('investorId')
    .exec()
    .then((data) => {
      res.status(200).json({
        msg: "Data obtained successfully",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        msg: "No Data obtained",
        Error: err,
      });
    });
};

  module.exports={
    entAddComplaints,
    investorAddComplaints,
    viewEntComplaint,
    viewInvestorComplaint
  }
  
  