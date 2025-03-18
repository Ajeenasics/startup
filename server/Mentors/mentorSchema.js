const mongoose = require("mongoose")


const mentorSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contact: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
   
    expertise_area: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    subscription_amount: {
        type: Number,
        required: true
    },
    demo_videolink: {
        type: Object,
        required: true
    },
    profile: {
        type: Object,
        required: true
    },
    adminApproved:{
        default:false,
        type:Boolean
    }
});

const mentorAddBlogSchema =mongoose.Schema({
    blogName:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    coverImage:{
        type:Object,
        required:true
    },
    date:{
        type:Date,
        default:new Date()
    },
    mentorId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'mentors'
    }
    
})

const mentorAddTutorialSchema =mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    videolink:{
        type:Object,
        required:true
    },
    date:{
        type:Date,
        default:new Date()
    },
    mentorId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'mentors'
    }
    
})

var mentors=mongoose.model('mentors',mentorSchema)
var mentorBlog=mongoose.model('mentorAddBlog',mentorAddBlogSchema)
var mentorTutorial=mongoose.model('mentorAddTutorial',mentorAddTutorialSchema)

module.exports = {
    mentors,
    mentorBlog,
    mentorTutorial
}