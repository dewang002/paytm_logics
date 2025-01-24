const {Router} = require("express")
const { authMiddleware } = require("../Middleware/middleware")
const { Account } = require("../db/db")
const { default: mongoose } = require("mongoose")
const router = Router()

router.get("/balance",authMiddleware,async(req,res)=>{
    const account =await Account.findOne({
        userId:req.userId
    })
    res.json({
        balance:account
    })
})

router.post("/transaction",authMiddleware, async (req,res)=>{
    const session = await mongoose.startSession()

    //then yor start the session 
    session.startTransaction()
    // from body you take out amount and to
    const {amount,to} = req.body
    // first find the account of the current user and connect it with session
    const account = await Account.findOne({userId:req.userId}).session(session)
    //and if the amount is less then the accuntbalance or account dont exist then just abort the transition
    if(!account || account.balance<amount){
        await session.abortTransaction()
        return res.status(400).json({
            message:"you dont have enough balance"
        })
    }
    //also find the "to" account and connect the session with that also and if the account to exist then just abort
    const toAccount = await Account.findOne({userId:to}).session(session)
    if(!toAccount){
        await session.abortTransaction()
        return res.status(400).json({
            message:"you dont have enough balance"
        })
    }
    //then you just have $inc to apply on current user and the to user .delete amount form the current and
    //increase in to user
    await Account.updateOne({userId:req.userId},{$inc:{balance:-amount}}).session(session)
    await Account.updateOne({userId:to},{$inc:{balance:amount}}).session(session)
    //at last you have to commit taransaction
    await session.commitTransaction()
    //and respond with message of success
    res.status(200).json({
        message:"transaction complete"
    }) 
})

module.exports = router