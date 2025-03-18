var Mentor=require('./mentorSchema')
const multer=require('multer')
const jwt = require('jsonwebtoken');
const secret = 'mentor';

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./upload");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage }).array("files");
const uploadblog=multer({storage:storage}).single("coverImage")
const uploadtutorial=multer({storage:storage}).single("videolink")


// Register mentors

const registerMentor= async(req,res)=>{
  try{
      const {
          name,
          email,
          contact,
          password,
          expertise_area,
          description,
          subscription_amount,
      }=req.body;
        
      const newMentor=new Mentor.mentors({
        name,
        email,
        contact,
        password,
        expertise_area,
        description,
        subscription_amount,
        demo_videolink:req.files[0],
        profile:req.files[1],
        
      
      });
      let existingMentor_email = await Mentor.mentors.findOne({ email });
      if (existingMentor_email) {
          return res.status(409).json({
              msg: "Email Already Registered With Us !!",
              data: null
          });
      }
      let existingMentor_contact = await Mentor.mentors.findOne({ contact });
      if (existingMentor_contact){
          return res.status(409).json({
              msg:"Contact Already Exists !!",
              data: null
          })
      }
      await newMentor.save()
      
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

// Update mentor by ID
const editMentorById = async (req, res) => {
  console.log(req.files);
  const { 
    name,
    email,
    contact,
    expertise_area,
    description,
    subscription_amount,
  } = req.body;

  const updateData = {
    name,
    email,
    contact,
    expertise_area,
    description,
    subscription_amount,
  };

  if (req.files && req.files.length > 0) {
    for (var i in req.files) {
      if(req.files[i].mimetype.indexOf('video') > 0) {
        updateData.demo_videolink = req.files[i];
      } else {
        updateData.profile = req.files[i];
      }
    }
  }

  try {
    const data = await Mentor.mentors.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json({
      status: 200,
      msg: "Updated successfully",
      data: data
    });
  } catch (err) {
    console.error(err);
    res.json({
      status: 502,
      msg: "Data not updated",
      Error: err,
    });
  }
};
// View mentorReqs for Admin
const viewMentorReqs = (req, res) => {
  Mentor.mentors.find({adminApproved:false})
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

// View Less mentorReqs for Admin
const viewLessMentorReqs = (req, res) => {
  Mentor.mentors.find({adminApproved:false}).sort({_id: -1}).limit(5)
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

// View all Mentors

const viewMentors = (req, res) => {
  Mentor.mentors.find({adminApproved:true})
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

// View mentor by ID
const viewMentorById = (req, res) => {
  Mentor.mentors.findById(req.params.id)
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

// approve mentorReq by  Admin
const approveMentorReqsById = (req, res) => {
  Mentor.mentors.findByIdAndUpdate({_id:req.params.id},{adminApproved:true,isActive:true})
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

// reject mentorReq by  Admin
const removeMentorById = (req, res) => {
  Mentor.mentors.findByIdAndDelete({_id:req.params.id})
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

const createToken = (user) =>{
  return jwt.sign({ userId: user.id }, secret, { expiresIn:'1hr' });
}

// Login Mentor 

const loginMentor=(req,res)=>{
  const { email , password }=req.body
  Mentor.mentors.findOne({email})
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

// Validate Token
const requireAuth = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "Unauthorized" });
  }

  jwt.verify(token, secret, (err, decodedToken) => {
    if (err) {
      return res.status(401).json({ msg: "Unauthorized", err: err });
    }

    req.user = decodedToken.userId;
    next();
  });
};

// Add Blog

const mentorAddBlog= async(req,res)=>{
  try{
    const{
    blogName,
    description,
  }=req.body;
  const newBlog=new Mentor.mentorBlog({
    blogName,
    description,
    coverImage:req.file,
    mentorId:req.params.id
  })
  await newBlog.save()
    .then(data => {
      res.status(200).json({
          msg: "New Blog Created successfully",
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


// View mentorViewBlog by ID
const viewBlogByMentorId = (req, res) => {
  Mentor.mentorBlog.find({mentorId:req.params.id}).populate('mentorId')
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

// View mentorViewBlog by ID
const mentorViewBlogById = (req, res) => {
  Mentor.mentorBlog.findById(req.params.id).populate('mentorId')
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


// View mentorViewBlog by ID
const mentorViewBlogByMentorId = (req, res) => {
  Mentor.mentorBlog.find({mentorId:req.params.id})
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

// Update Blog

const mentorUpdateBlog = async(req,res)=>{
  const {
    blogName,
    description,
  }=req.body
  await Mentor.mentorBlog.findByIdAndUpdate(req.params.id,
    {
      blogName,
      description,
      coverImage:req.file
    })
    .exec()
    .then(data=>{
      res.status(200).json({
        msg:"Updated Successfully",
        data:data 
      })
    })
    .catch(err=>{
      console.log(err);
      res.status(500).json({
        msg:"Not Updated",
        Error:err
      })
    })
}

// Delete Blog By ID

const mentorRemoveBlog=(req,res)=>{
  Mentor.mentorBlog.findByIdAndDelete(req.params.id)
  .exec()
  .then(data=>{
    res.status(200).json({
      msg:"Deleted Successfully",
      data:data
    })
  })
  .catch(err=>{
    res.status(500).json({
      msg:"Something went Wrong",
      Error:err
    })
  })
}

const viewAllBlogs=(req,res)=>{
  Mentor.mentorBlog.find({}).populate('mentorId')
  .exec()
  .then(data=>{
    res.status(200).json({
      msg:"Deleted Successfully",
      data:data
    })
  })
  .catch(err=>{
    res.status(500).json({
      msg:"Something went Wrong",
      Error:err
    })
  })
}
// Add Tutorial

const mentorAddTutorial= async(req,res)=>{
  try{
    const{
      title,
      description,
  }=req.body;
  const newTutorial=new Mentor.mentorTutorial({
    title,
    description,
    videolink:req.file,
    mentorId:req.params.id

  })
  await newTutorial.save()
    .then(data => {
      res.status(200).json({
          msg: "New Tutorial Created successfully",
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

// View Tutorials

const ViewAllTutorial=(req,res)=>{
  Mentor.mentorTutorial.find().populate('mentorId')
  .exec()
  .then(data=>{
    res.status(200).json({
      msg:"Data Obtained Successfully",
      data:data
    })
  })
  .catch(err=>{
    res.status(500).json({
      msg:"Data not Obtained",
      Error:err
    })
  })
}

// View mentorViewTutorial by ID
const mentorViewTutorialById = (req, res) => {
  const mentorid=req.params.mentorId
  Mentor.mentorTutorial.findById(mentorid).populate('mentorId')
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

// View mentorViewTutorial by ID
const mentorViewTutorialByMentorId = (req, res) => {
  Mentor.mentorTutorial.findById({mentorId:req.params.id})
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


// View mentorViewTutorial by  mentor ID
const ViewTutorialBymentorId = (req, res) => {
  Mentor.mentorTutorial.find({mentorId:req.params.id})
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
// Update Tutorial

const mentorUpdateTutorial=(req,res)=>{
  const{
    title,
    description
  }=req.body
  Mentor.mentorTutorial.findByIdAndUpdate(req.params.id,{
    title,
    description,
    videolink:req.file
  })
  .exec()
  .then(data=>{
    res.status(200).json({
      msg:"Updated Successfully",
      data:data
    })
  })
  .catch(err=>{
    res.status(500).json({
      msg:"Not Updated",
      Error:err
    })
  })
}

// Delete Tutorial 

const mentorRemoveTutorial=(req,res)=>{
  Mentor.mentorTutorial.findByIdAndDelete(req.params.id)
  .exec()
  .then(data=>{
    res.status(200).json({
      msg:"Deleted Successfully",
      data:data
    })
  })
  .catch(err=>{
    res.status(500).json({
      msg:"Something went Wrong",
      Error:err
    })
  })
}


// Forgot Password for entrepreneur
const forgotPassword = (req, res) => {
  Mentor.mentors.findOneAndUpdate(
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
  registerMentor,
  upload,
  viewLessMentorReqs,
  viewMentorReqs,
  viewMentors,
  viewMentorById,
  approveMentorReqsById,
  removeMentorById,
  loginMentor,
  requireAuth,
  editMentorById,
  mentorAddBlog,
  uploadblog,
  viewAllBlogs,
  mentorViewBlogById,
  mentorUpdateBlog,
  mentorRemoveBlog,
  mentorAddTutorial,
  uploadtutorial,
  ViewTutorialBymentorId,
  mentorViewTutorialById,
  mentorUpdateTutorial,
  mentorRemoveTutorial,
  forgotPassword,
  viewBlogByMentorId,
  ViewAllTutorial
  
}