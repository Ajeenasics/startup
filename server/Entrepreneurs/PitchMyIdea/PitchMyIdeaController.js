const pitch_my_idea =require("./PitchMyIdeaSchema")


// addCompany

const addCompany = async (req, res) => {
try {
    const { 
        companyName,
        category,
        audience,
        workingArea,
        domain,
        market,
        value,
        competitor1,
        competitor2,
        differentiator,
        currentStatus,
        expectedHelpCategory,
        expectedHelp,
        equityAmount,
    } = req.body;

    

    const newpitchMyIdea = new pitch_my_idea({
        epId:req.params.id,
        companyName,
        category,
        audience,
        workingArea,
        domain,
        market,
        value,
        competitor1,
        competitor2,
        differentiator,
        currentStatus,
        expectedHelpCategory,
        expectedHelp,
        equityAmount,
        IsActive:false,
        status:true,
       
    });

    newpitchMyIdea
    .save()
    .then((data) => {
      res.status(200).json({
        msg: "Inserted successfully",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        msg: "Data not Inserted",
        data: err,
      });
    });
} catch (error) {
  res.status(500).json({ message: error.message });
}
};

// ShowActive

const showActiveCompany=(req,res)=>{
    pitch_my_idea.find({IsActive:true})
    .exec()
    .then((data) => {
        if (data.length > 0) {
          res.status(200).json({
            msg: "Data obtained successfully",
            data: data,
          });
        } else {
          res.status(200).json({
            msg: "No Data obtained",
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          msg: "Data not obtained",
          Error: err,
        });
      });
}

// show Not Active Company

const showNotActiveCompany=(req,res)=>{
    pitch_my_idea.find({IsActive:false})
    .exec()
    .then((data) => {
        if (data.length > 0) {
          res.status(200).json({
            msg: "Data obtained successfully",
            data: data,
          });
        } else {
          res.status(200).json({
            msg: "No Data obtained",
          });
        }
      })
      .catch((err) => {
        res.status(500).json({
          msg: "Data not obtained",
          Error: err,
        });
      });
}

// View all Startup Plan
const viewStartupPlan = (req, res) => {
  pitch_my_idea.find()
    .exec()
    .then((data) => {
      console.log(data);
      if (data.length > 0) {
        res.status(200).json({
          msg: "Data obtained successfully",
          data: data,
        });
      } else {
        res.status(200).json({
          msg: "No Data obtained",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        msg: "Data not obtained",
        Error: err,
      });
    });
};

// View StartUpPlan by ID
const viewStartUpPlanById = (req, res) => {
  const pmi_id=req.params.id
  pitch_my_idea.findById({_id:pmi_id})
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
};


// View StartUpPlan by ID
const viewStartUpPlanByEntrepId = (req, res) => {
  const pmi_id=req.params.id
  pitch_my_idea.find({epId:pmi_id})
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
};


// Update startupPlan by ID
const editStartUpPlanById = async (req, res) => {
  const { 
        companyName,
        category,
        audience,
        workingArea,
        domain,
        market,
        value,
        competitor1,
        competitor2,
        differentiator,
        currentStatus,
        expectedHelpCategory,
        expectedHelp,
        equityAmount,
  } =
    req.body;

    await pitch_my_idea.findByIdAndUpdate({ _id: req.params.id },{
        companyName,
        category,
        audience,
        workingArea,
        domain,
        market,
        value,
        competitor1,
        competitor2,
        differentiator,
        currentStatus,
        expectedHelpCategory,
        expectedHelp,
        equityAmount,

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
        res.json({
          status:502,
          msg: "Data not Updated",
          Error: err,
        });
      });
    };


// Delete startupPlan by ID
const deleteStartupPlanById = (req, res) => {
  pitch_my_idea.findByIdAndDelete(req.params.id)
    .exec()
    .then((data) => {
      res.status(200).json({
        msg: "Data removed successfully",
        data: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        msg: "No Data obtained",
        Error: err,
      });
    });
};

module.exports={
    addCompany,
    showActiveCompany,
    showNotActiveCompany,
    viewStartupPlan,
    editStartUpPlanById,
    viewStartUpPlanById,
    deleteStartupPlanById,
    viewStartUpPlanByEntrepId
}
