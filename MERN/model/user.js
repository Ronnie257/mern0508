const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
   name: {type:String,required:true},
   email:{ type:String , unique:true},
   password:{type:String},
   mobile:{type:String},
   address:{ type:String},
   created_at:{type:Date, default:Date.now}

})

 const User = mongoose.model("User", userSchema)

 module.exports = {User}