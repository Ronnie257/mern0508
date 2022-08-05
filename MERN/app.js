const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const port = process.env.PORT || 9000


const userRoute = require('./routes/userroutes')
const url = process.env.MONGO_URI 

mongoose.connect( url , (err)=>{
    if(!err){
        console.log("database connected!")
    }else{
        console.log(err)
    }
})

const app = express()
app.use(express.json())
app.use('/' , userRoute);

app.listen(port , ()=> console.log(`server starts on ${port}`))

