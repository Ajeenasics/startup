const router=require('express').Router()
const entrepreneurs=require('./Entrepreneurs/entrepreneurController')
const investors=require('./Investors/investorController')

const mentors=require('./Mentors/mentorController')
const admin=require('./Admin/adminController')
const chat=require('./Chats/chatController')
const Subscription=require('./Subscription/subscriptionController')
const investorChat=require('./InvestorChats/investorChatController')


const pitch_my_idea=require('./Entrepreneurs/PitchMyIdea/PitchMyIdeaController')
const InvestorReqs=require('./EntInvestorReqs/entInvestorReqController')
const Events=require('./Events/eventController')
const Complaints=require('./Complaints/ComplaintController')

//entrepreneurs
router.post('/registerEntrepreneur',entrepreneurs.upload,entrepreneurs.registerEntrepreneur)
router.post('/loginEntrepreneur',entrepreneurs.login)
router.post('/viewEntrepreneurs',entrepreneurs.viewEntrepreneurs)
router.post('/viewEntrepreneurById/:id',entrepreneurs.viewEntrepreneurById)
router.post('/editEntrepreneurById/:id',entrepreneurs.upload,entrepreneurs.editEntrepreneurById)
router.post('/forgotPasswordEntrepreneur',entrepreneurs.forgotPassword)
router.post('/viewEntrepreneurs',entrepreneurs.viewEntrepreneurs)
router.post('/deleteEntrepreneurById/:id',entrepreneurs.deleteEntrepreneurById)

router.post('/entBanByAdmin/:id',entrepreneurs.entBanByAdmin)
router.post('/entBanByAdminactivate/:id',entrepreneurs.entBanByAdminActivate)


router.post('/pitchMyIdeaAddCompany/:id',pitch_my_idea.addCompany)
router.post('/pitchMyIdeaActiveCompany',pitch_my_idea.showActiveCompany)
router.post('/pitchMyIdeaNotActiveCompany',pitch_my_idea.showNotActiveCompany)
router.post('/viewStartupPlan',pitch_my_idea.viewStartupPlan)
router.post('/deleteStartupPlanById/:id',pitch_my_idea.deleteStartupPlanById)
router.post('/editStartupPlanById/:id',pitch_my_idea.editStartUpPlanById)
router.post('/viewStartupPlanById/:id',pitch_my_idea.viewStartUpPlanById)
router.post('/viewStartUpPlanByEntrepId/:id',pitch_my_idea.viewStartUpPlanByEntrepId)






// investor 
router.post('/registerInvestor',investors.upload,investors.registerInvestor)
router.post('/loginInvestor',investors.loginInvestor)
router.post('/viewInvestors',investors.viewInvestors)
router.post('/viewInvestorById/:id',investors.viewInvestorById)
router.post('/editInvestorById/:id',investors.uploadSingle,investors.editInvestorById)
router.post('/viewInvestorReqs',investors.viewInvestorReqs)
router.post('/approveInvestorReqsById/:id',investors.approveInvestorReqsById)
router.post('/removeInvestorById/:id',investors.removeInvestorById)
router.post('/activateInvestorById/:id',investors.activateInvestorById)
router.post('/deActivateInvestorById/:id',investors.deActivateInvestorById)
router.post('/viewlessinvestors',investors.viewLessInvestorReqs)
router.post('/viewInvestorByCategory/:category',investors.viewInvestorByCategory)
router.post('/forgotPasswordInvestor',investors.forgotPassword)
router.post('/investorBanByAdmin/:id',investors.investorBanByAdmin)





// mentor
router.post('/registerMentor',mentors.upload,mentors.registerMentor)
router.post('/loginMentor',mentors.loginMentor)
router.post('/viewlessmentors',mentors.viewLessMentorReqs)
router.post('/viewMentorsReqs',mentors.viewMentorReqs)
router.post('/viewMentors',mentors.viewMentors)
router.post('/viewMentorById/:id',mentors.viewMentorById)
router.post('/approveMentorReqsById/:id',mentors.approveMentorReqsById)
router.post('/removeMentorById/:id',mentors.removeMentorById)
router.post('/editMentorById/:id',mentors.upload,mentors.editMentorById)
router.post('/forgotPasswordMentors',mentors.forgotPassword)



router.post('/mentorAddBlog/:id',mentors.uploadblog,mentors.mentorAddBlog)
router.post('/mentorViewBlog/:id',mentors.viewBlogByMentorId)
router.post('/mentorViewBlogById/:id',mentors.mentorViewBlogById)
router.post('/mentorUpdateBlog/:id',mentors.uploadblog,mentors.mentorUpdateBlog)
router.post('/mentorRemoveBlog/:id',mentors.mentorRemoveBlog)
router.post('/viewAllBlogs',mentors.viewAllBlogs)
router.post('/viewBlogByMentorId/:id',mentors.viewBlogByMentorId)


router.post('/mentorAddTutorial/:id',mentors.uploadtutorial,mentors.mentorAddTutorial)
router.post('/mentorViewTutorial',mentors.ViewAllTutorial)
router.post('/mentorViewTutorialById/:mentorId',mentors.mentorViewTutorialById)
router.post('/mentorUpdateTutorial/:id',mentors.uploadtutorial,mentors.mentorUpdateTutorial)
router.post('/mentorRemoveTutorial/:id',mentors.mentorRemoveTutorial)
router.post('/mentorRemoveTutorial/:id',mentors.mentorRemoveTutorial)
router.post('/ViewTutorialBymentorId/:id',mentors.ViewTutorialBymentorId)


//Admin routes
router.post('/loginAdmin',admin.loginAdmin)
router.post('/forgotPassword',admin.forgotPassword)


//investor Reqs
router.post('/reqInvestorById',InvestorReqs.reqInvestorById)
router.post('/viewInvestorReqById/:id',InvestorReqs.viewInvestorReqById)
router.post('/deleteInvestorReqById/:id',InvestorReqs.deleteInvestorReqById)
router.post('/viewInvestorReqByEntId/:id',InvestorReqs.viewInvestorReqByEntId)
router.post('/viewAcceptedReqsByInvId/:id',InvestorReqs.viewAcceptedReqsByInvId)
router.post('/viewInvestorReqByInvId/:id',InvestorReqs.viewInvestorReqByInvId)
router.post('/viewAcceptedReqsByEntId/:id',InvestorReqs.viewAcceptedReqsByEntId)
router.post('/acceptInvestorReqByInvId/:id',InvestorReqs.acceptInvestorReqByInvId)
router.post('/rejectInvestorReqById/:id',InvestorReqs.rejectInvestorReqById)
router.post('/viewInvestorReqByPlanId/:id',InvestorReqs.viewInvestorReqByPlanId)


//chat
router.post('/chatting',chat.chatting)
router.post('/viewChatMsgs',chat.viewChatMsgs)


//subscription
router.post('/addSubscription',Subscription.addSubscription)
router.post('/viewSubscriptionById/:id',Subscription.viewSubscriptionById)
router.post('/viewSubscriptions',Subscription.viewSubscriptions)
router.post('/viewSubscriptionsByEntrepId/:id',Subscription.viewSubscriptionsByEntrepId)
router.post('/viewSubscriptionsByMentorId/:id',Subscription.viewSubscriptionsByMentorId)
router.post('/deleteSubscriptionById/:id',Subscription.deleteSubscriptionById)

//Events
router.post('/addEvent',Events.addEvent)
router.post('/viewEvents',Events.viewEvents)
router.post('/removeEventById/:id',Events.removeEventById)
router.post('/viewEventsById/:id',Events.viewEventsById)
router.post('/addEventRegistration',Events.addEventRegistration)
router.post('/viewEventRegistrations/:id',Events.viewEventRegistrations)
router.post('/viewEventRegistrationsByEventId/:eventId',Events.viewEventRegistrationsByEventId)
router.post('/registerEventEntrepreneur',Events.registerEventEntrepreneur)
router.post('/viewEventRegistration',Events.viewEventRegistration)
router.post('/viewEventRegistratiobyentid/:eventId',Events.viewEventRegistratiobyentid)
//Complaints

router.post('/entAddComplaints/:id',Complaints.entAddComplaints)
router.post('/investorAddComplaints/:id',Complaints.investorAddComplaints)
router.post('/viewEntComplaint',Complaints.viewEntComplaint)
router.post('/viewInvestorComplaint',Complaints.viewInvestorComplaint)



//investor chat
router.post('/chattingWithInvestor',investorChat.chatting)
router.post('/viewChatMsgsWithInvestor',investorChat.viewChatMsgs)


module.exports=router
