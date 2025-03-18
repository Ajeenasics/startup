const Entrepreneur = require("./entrepreneurSchema");
const jwt = require("jsonwebtoken");
const secret = "entrepreneur"; // Replace this with your own secret key
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./upload");
  },

  filename: function (req, file, cb) {
    const uniquePrefix = "prefix-"; // Add your desired prefix here
    const originalname = file.originalname;
    const extension = originalname.split(".").pop();
    const filename =
      uniquePrefix +
      originalname.substring(0, originalname.lastIndexOf(".")) +
      "-" +
      Date.now() +
      "." +
      extension;
    cb(null, filename);
  },
});
const upload = multer({ storage: storage }).single("image");

// Register Entrepreneur
// const registerEntrepreneur = async (req, res) => {
//   try {
//     const {
//       fname,
//       lname,
//       company_name,
//       corporate_id_no,
//       industry_sector,
//       company_description,
//       email,
//       location,
//       contact,
//       // username,
//       address,
//       password,
//     } = req.body;

//     const newEntrepreneur = new Entrepreneur({
//       fname,
//       lname,
//       company_name,
//       corporate_id_no,
//       industry_sector,
//       company_description,
//       email,
//       location,
//       contact,
//       // username,
//       address,
//       password,
//       image: req.file,
//     });

//     let existingEntrepreneur = await Entrepreneur.findOne({ email });
//     if (existingEntrepreneur) {
//       return res.status(409).json({
//         msg: "Email Already Registered With Us !!",
//         data: null,
//       });
//     }

//     await newEntrepreneur
//       .save()
//       .then((data) => {
//         res.status(200).json({
//           msg: "Inserted successfully",
//           data: data,
//         });
//       })
//       .catch((err) => {
//         res.status(500).json({
//           msg: "Data not Inserted",
//           data: err,
//         });
//       });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


const registerEntrepreneur = async (req, res) => {
  try {
    const {
      fname,
      lname,
      company_name,
      corporate_id_no,
      industry_sector,
      company_description,
      email,
      location,
      contact,
      address,
      password,
    } = req.body;

    // Check if the email is already registered
    let existingEntrepreneurByEmail = await Entrepreneur.findOne({ email });
    if (existingEntrepreneurByEmail) {
      return res.status(409).json({
        msg: "Email Already Registered With Us !!",
        data: null,
      });
    }

    // Check if the corporate_id_no is already registered
    let existingEntrepreneurByCorporateId = await Entrepreneur.findOne({ corporate_id_no });
    if (existingEntrepreneurByCorporateId) {
      return res.status(409).json({
        msg: "Corporate ID Already Registered With Us !!",
        data: null,
      });
    }

    // Create a new entrepreneur instance
    const newEntrepreneur = new Entrepreneur({
      fname,
      lname,
      company_name,
      corporate_id_no,
      industry_sector,
      company_description,
      email,
      location,
      contact,
      address,
      password,
      image: req.file,
    });

    // Save the new entrepreneur to the database
    await newEntrepreneur
      .save()
      .then((data) => {
        res.status(200).json({
          msg: "Inserted successfully",
          data: data,
        });
      })
      .catch((err) => {
        res.status(500).json({
          msg: "Data not Inserted",
          data: err,
        });
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// View all entrepreneurs
const viewEntrepreneurs = (req, res) => {
  Entrepreneur.find()
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
};

// Update entrepreneur by ID
const editEntrepreneurById = async (req, res) => {
  const {
    fname,
    lname,
    company_name,
    corporate_id_no,
    industry_sector,
    company_description,
    email,
    location,
    contact,
    // username,
    address,
    password,
  } = req.body;

  const entrepreneur = req.body;

  try {
    let existingEntrepreneur = await Entrepreneur.findOne({ contact });
    let entrepreneurData = await Entrepreneur.findById({ _id: req.params.id });

    if (entrepreneurData.contact != req.body.contact) {
      if (
        existingEntrepreneur &&
        existingEntrepreneur.contact !== req.body.contact
      ) {
        return res.status(409).json({
          msg: "Contact Number Already Registered With Us !!",
          data: null,
        });
      }
    }

    await Entrepreneur.findByIdAndUpdate(
      { _id: req.params.id },
      {
        fname,
        lname,
        company_name,
        corporate_id_no,
        industry_sector,
        company_description,
        email,
        location,
        contact,
        // username,
        address,
        image: req.file,
      }
    )
      .exec()
      .then((data) => {
        res.json({
          status: 200,
          msg: "Updated successfully",
          data: data,
        });
      })
      .catch((err) => {
        res.json({
          status: 502,
          msg: "Data not Updated",
          Error: err,
        });
      });
  } catch (error) {
    console.log(error);
    res.json({
      status: 500,

      message: error.message,
    });
  }
};

// View entrepreneur by ID
const viewEntrepreneurById = (req, res) => {
  const ent_id = req.params.id;
  Entrepreneur.findById({ _id: ent_id })
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

// Ban By admin
const entBanByAdmin = (req, res) => {
  Entrepreneur.findByIdAndUpdate({ _id: req.params.id }, { isActive: false })
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

const entBanByAdminActivate = (req, res) => {
  Entrepreneur.findByIdAndUpdate({ _id: req.params.id }, { isActive: true })
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

// Delete entrepreneur by ID
const deleteEntrepreneurById = (req, res) => {
  Entrepreneur.findByIdAndDelete(req.params.id)
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

// Forgot Password for entrepreneur
const forgotPassword = (req, res) => {
  Entrepreneur.findOneAndUpdate(
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

// Reset Password for entrepreneur
const resetPassword = async (req, res) => {
  let pwdMatch = false;

  await Entrepreneur.findById(req.params.id)
    .exec()
    .then((data) => {
      if (data.password === req.body.oldpassword) pwdMatch = true;
    })
    .catch((err) => {
      res.status(500).json({
        msg: "Data not Updated",
        Error: err,
      });
    });

  if (pwdMatch) {
    await Entrepreneur.findByIdAndUpdate(req.params.id, {
      password: req.body.newpassword,
    })
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
  } else {
    res.status(405).json({
      msg: "Your Old Password doesn't match",
    });
  }
};

const createToken = (user) => {
  return jwt.sign({ userId: user._id }, secret, { expiresIn: "1h" });
};

// Login
const login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "Email and password is required" });
  }

  Entrepreneur.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.json({ status: 405, msg: "User not found" });
      }

      if (user.password !== password) {
        return res.json({ status: 405, msg: "Password Mismatch !!" });
      }

      const token = createToken(user);

      res.json({
        data: user,
        status: 200,
        token: token,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ msg: "Something went wrong" });
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

module.exports = {
  registerEntrepreneur,
  viewEntrepreneurs,
  editEntrepreneurById,
  viewEntrepreneurById,
  deleteEntrepreneurById,
  forgotPassword,
  resetPassword,
  login,
  requireAuth,
  upload,
  entBanByAdmin,
  entBanByAdminActivate,
};
