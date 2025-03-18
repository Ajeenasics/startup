const admin = require('./adminSchema')


  
const forgotPassword = async (req, res) => {
    let pwdMatch = false,newEntry=true
const data=await admin.findOne({role:'admin' })
    

        if(data==null)
         {
          const newAdmin = new admin({
role:'admin',
email:'admin@gmail.com',
password:'admin@123'
        })

       await newAdmin.save()
        .then(datass=>{
          console.log("done");
          if(req.body.email=="admin@gmail.com")
            pwdMatch=true
        })
        .catch(err=>{
          console.log(err);
        })
         }
         else{
          if(req.body.email=data.email)
            pwdMatch=true
         }
        console.log("p",pwdMatch);
    if (pwdMatch) {
      await admin.findOneAndUpdate({role:'admin' }, {
  
        password: req.body.password
      })
        .exec().then(data => {
            res.json({
              status: 200,
              msg: "Updated successfully"
            })
         
        }).catch(err => {
          console.log(err);
          res.json({
            status: 500,
            msg: "Data not Updated",
            Error: err
          })
        })
    } else {
      res.json({
        status: 405,
        msg: "Invalid Username !!"
  
      })
    }
  }
  
  
const loginAdmin = async(req, res) => {
  const email = req.body.email
  const password = req.body.password
let empty=false

await admin.find().exec().then(datas => {
    if(datas.length<=0)
     empty=true
    }).catch(err=>{
    console.log(err);})
    if(empty==false){
  admin.findOne({ email: email }).exec().then(data => {
    if (data) {
      if (password == data.password) {
        res.json({
          status: 200,
          msg: "Login successfully",
          data: data
        })
      } else {
        res.json({
          status: 401,
          msg: "Password Mismatch !",

        })
      }
    } else {

      
      res.json({
        status: 405,
        msg: "Invalid Username !! ",

      })
    }




  }).catch(err => {
    res.json({
      status: 500,
      msg: "Internal Server Error",
      Error: err
    })
  })
}else{
if(email=='admin@gmail.com'){
if (password =='admin@123') {
    res.json({
      status: 200,
      msg: "Login successfully",
    })
  } else {
    res.json({
      status: 401,
      msg: "Password Mismatch !",

    })
  }
} else {
  res.json({
    status: 405,
    msg: "Invalid Username !! ",

  })
}
}
};
module.exports={
    loginAdmin,
    forgotPassword

}