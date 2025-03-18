const mongoose = require("mongoose");

const entcomplaintSchema = new mongoose.Schema(
    {

        entId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'entrepreneurs'
        },
        description:{
            type:String,
            required:true
        },
        date:{
            type:Date,
            default:new Date()
        },
        
    })

    const invcomplaintSchema = new mongoose.Schema(
    {

        investorId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'investors'
        },
        description:{
            type:String,
            required:true
        },
        date:{
            type:Date,
            default:new Date()
        },
        
    })

    var entcomplaint=mongoose.model('entcomplaints',entcomplaintSchema)
    var invcomplaint=mongoose.model('investorcomplaints',invcomplaintSchema)

    module.exports={
        entcomplaint,
        invcomplaint
    }