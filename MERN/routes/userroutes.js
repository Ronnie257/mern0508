const express = require('express')
const {getallUser, getuserById , newUser ,loginUser , updateUser , deleteUser} = require("../controller/user")
const router = express.Router()

router.get('/getalluser' , getallUser)
router.get("/getuserById/:id" ,  getuserById)
router.post('/newuser' , newUser)
router.post('/login' , loginUser)
router.put('/updateuser/:id' , updateUser)
router.delete('/deleteuser/:id' , deleteUser)

module.exports = router