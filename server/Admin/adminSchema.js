const mongoose= require("mongoose");

const adminSchema=mongoose.Schema({

    email:{
        type:String,
        default:'admin@gmail.com'
       
    },
    password:{
        type:String,
       
        default:'admin@123'
    },
    role:{
        type:String,
       
        default:'admin'
    }
});
module.exports=mongoose.model('admin',adminSchema)

