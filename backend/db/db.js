const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://dewangthapa6:iQo4ME96CFPITA8c@cluster0.hd2m4.mongodb.net/paytm')


const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
})

const accountSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        require:true
    },
    balance:{
        type:Number,
        require:true
    }
})
 
const User = mongoose.model("user_data",userSchema)
const Account = mongoose.model("account_data",accountSchema)
module.exports ={ User,Account }