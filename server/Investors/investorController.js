const Investor =require('./investorSchema');
const multer=require('multer');
const jwt = require('jsonwebtoken');
const secret = 'invester';

const storage=multer.diskStorage({
    destination:function(req,res,cb){
        cb(null,"./upload");
    },
    filename:function(req,file,cb){
        const uniquePrefix='prefix-';
        const originalname=file.originalname;
        const extension=originalname.split('.').pop();
        const filename=uniquePrefix + originalname.substring(0, originalname.lastIndexOf('.'))+ '-' + Date.now() + '.' + extension;
        cb(null,filename);
    },
});
const upload = multer({storage:storage}).array("files");
const uploadSingle= multer({storage:storage}).single("profile");

// Register Investor

const registerInvestor= async(req,res)=>{
    console.log("in Api");
    try{
        const {
            name,
            email,
            contact,
            organization,
            nationality,
            password,
            investing_category,
            occupation,
            description,
            address,
        }=req.body;

        const newInvestor=new Investor({
            name,
            email,
            contact,
            organization,
            nationality,
            password,
            investing_category,
            occupation,
            description,
            address,
            profile:req.files[0],
            identification_document:req.files[1],
        
        });
        let existingInvestor_email = await Investor.findOne({ email });
        if (existingInvestor_email) {
            return res.status(409).json({
                msg: "Email Already Registered With Us !!",
                data: null
            });
        }
        let existingInvestor_contact = await Investor.findOne({ contact });
        if (existingInvestor_contact){
            return res.status(409).json({
                msg:"Contact Already Exists !!",
                data: null
            })
        }
        await newInvestor.save()
        
        .then(data => {
            res.status(200).json({
                msg: "Inserted successfully",
                data: data
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                msg: "Data not Inserted",
                data: err
            });
        });
    }catch (error) {
        console.log("err",error);
        res.status(500).json({ message: error.message });
    }
}

// View all investors
const viewInvestors = (req, res) => {
    Investor.find({adminApproved:true})
        .exec()
        .then(data => {
            if (data.length > 0) {
                res.status(200).json({
                    msg: "Data obtained successfully",
                    data: data
                });
            } else {
                res.status(200).json({
                    msg: "No Data obtained",
                    data: []
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                msg: "Data not obtained",
                Error: err
            });
        });
};

// View investor by ID
const viewInvestorById = (req, res) => {
    Investor.findById(req.params.id)
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
  

// View investor by ID
const viewInvestorByCategory = (req, res) => {
  console.log(req.params.category)
  try {
    Investor.find({investing_category:req.params.category})
    .exec()
    .then((data) => {
      res.status(200).json({
        msg: "Data obtained successfully",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        msg: "No Data obtained",
        Error: err,
      });
    });
  } catch(err) {
    console.log(err);

    res.status(500).json({
      msg: "No Data obtained",
      Error: err,
    });
  }
  
};
// View investorLessReqs for Admin
const viewLessInvestorReqs = (req, res) => {
  Investor.find({adminApproved:false}).sort({_id: -1}).limit(5)
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

// View investorReqs for Admin
const viewInvestorReqs = (req, res) => {
    Investor.find({adminApproved:false})
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
 
// approve investorReq by  Admin
const approveInvestorReqsById = (req, res) => {
    Investor.findByIdAndUpdate({_id:req.params.id},{adminApproved:true,isActive:true})
      .exec()
      .then((data) => {
        res.status(200).json({
          msg: "Data updated successfully",
          data: data,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          msg: "No Data updated",
          Error: err,
        });
      });
  };
  
// reject investorReq by  Admin
const removeInvestorById = (req, res) => {
    Investor.findByIdAndDelete({_id:req.params.id})
      .exec()
      .then((data) => {
        res.status(200).json({
          msg: "Data removed successfully",
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
  
// approve investorReq by  Admin
const activateInvestorById = (req, res) => {
    Investor.findByIdAndUpdate({_id:req.params.id},{isActive:true})
      .exec()
      .then((data) => {
        res.status(200).json({
          msg: "Activated successfully",
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
  
// approve investorReq by  Admin
const deActivateInvestorById = (req, res) => {
    Investor.findByIdAndUpdate({_id:req.params.id},{isActive:false})
      .exec()
      .then((data) => {
        res.status(200).json({
          msg: "DeActivated successfully",
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
const createToken = (user) =>{
    return jwt.sign({ userId: user.id }, secret, { expiresIn:'1hr' });
}


// approve investorReq by  Admin
const investorBanByAdmin = (req, res) => {
  Investor.findByIdAndUpdate({_id:req.params.id},{isActive:false})
    .exec()
    .then((data) => {
      res.status(200).json({
        msg: "Data updated successfully",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        msg: "No Data updated",
        Error: err,
      });
    });
};

// Login Investor 

const loginInvestor=(req,res)=>{
    const { email , password }=req.body
    Investor.findOne({email})
    .exec()
    .then(user=>{
        if(!user){
            return res.json({status:409,msg:'user not found'})
        }else if(user.password!==password){
            return res.json({status:409,msg:'Password Missmatch !!'})
        }

        const token = createToken(user)

        res.json({
            data:user,
            status:200,
            token:token
        });
    })
    .catch(err=>{
        console.log(err);
        return res.status(500).json({msg:'Something went wrong'})
    });

};

// Update investor by ID
const editInvestorById = (req, res) => {
    const { 
        name,
        email,
        contact,
        organization,
        nationality,
        investing_category,
        occupation,
        description,
        address,
    } = req.body;
  
  Investor.findByIdAndUpdate(req.params.id,{
        name,
        email,
        contact,
        organization,
        nationality,
        investing_category,
        occupation,
        description,
        address,
        profile:req.file,
        })
        .exec()
        .then((data) => {
          res.json({
            status:200,
            msg: "Updated successfully",
            data:data
          });
        })
        .catch((err) => {
            console.log(err);
          res.json({
            status:502,
            msg: "Data not Updated",
            Error: err,
          });
        });
    
  };


// Forgot Password for entrepreneur
const forgotPassword = (req, res) => {
  Investor.findOneAndUpdate(
    { email: req.body.email },
    {
      password: req.body.password,
    }
  )
    .exec()
    .then((data) => {
      if (data != null)
        res.status(200).json({
          msg: "Updated successfully",
        });
      else
        res.status(500).json({
          msg: "User Not Found",
        });
    })
    .catch((err) => {
      res.status(500).json({
        msg: "Data not Updated",
        Error: err,
      });
    });
};

module.exports={
    registerInvestor,
    upload,
    loginInvestor,
    viewInvestors,
    viewInvestorById,
    editInvestorById,
    viewInvestorReqs,
    activateInvestorById,
    removeInvestorById,
    activateInvestorById,
    deActivateInvestorById,
    approveInvestorReqsById,
    uploadSingle,
    viewLessInvestorReqs,
    viewInvestorByCategory,
    forgotPassword,
    investorBanByAdmin
}