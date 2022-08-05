const {User} = require("../model/user")
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.getallUser = async(req,res)=>{
  User.find({}).then((users)=>{
      res.send(users)
  }).catch((err)=>{
      console.log(err)
  })
}

exports.getuserById = async (req,res)=>{
    User.findById({_id: req.params.id}).then((user)=>{
        if(user){
          res.send(user)   
        }
    });
}

exports.newUser = async(req,res)=>{
    try {
        const{name , email, password, mobile, address } = req.body ;
        
         if (!email){
             res.send(" email is required!")
         }
         console.log(">>> \n\n\n within if outside condition")
         
       const oldUser = await User.findOne({email})
        if(oldUser){
            return res.send("user already exist . please login!")
        }  

       encryptedPassword = await bcryptjs.hash(password, 10)

       const user = await User.create({
           name,
           email: email.toLowerCase(),
           password: encryptedPassword,
           mobile, address
       })

    //   const retuser = { 
    //       name: user.name,
    //       email: user.email,
    //       password: user.password,
    //       mobile:user.mobile,
    //       address:user.address
    //   }
       
      res.json("user registartion is sucessfully!" )
    } catch (error) {
        console.log(error)
    }
}

exports.loginUser = async(req,res)=>{
   try {
       const{email, password} = req.body
       if(!email && !password) {
           res.send("all input is required!")
       }
    
       User.findOne({email})
        .then((user)=>{
            if(!user){
                return res.send("User not found");
            }

            bcryptjs.compare(password , user.password ).then((isMatch)=>{
              if(!isMatch){
                return res.send("Invalid Password");
            }

           const token = jwt.sign(
            {user_id: user._id , email}, 
               process.env.TOKEN_KEY,{ expiresIn: "1h" }
            );
           console.log(">>> \n\n user_id :" ,  user._id )
           console.log(">>> \n\n email :" ,  email  )

            user.token = token
            const userData = {
                name:user.name,
                email: user.email,
                mobile:user.mobile,
                address:user.address,
                token: user.token
            }
              res.json(userData)
            
          })  
         
        })
        .catch((err)=>{
            console.log(err)
        })
   } catch (error) {
       console.log(error)
   }
}

exports.updateUser = async (req,res)=>{
    User.findOneAndUpdate({_id: req.params.id},req.body).then((user)=>{
        User.findOne({_id: req.params.id}).then((user)=>{
            res.send(user);
        });
        
    });
}

exports.deleteUser = async(req,res)=>{
    User.findOneAndDelete({_id: req.params.id}).then((user)=>{
        if(user){
          res.send("user deleted sucessfully!")   
        }
    });
}
    


    
    
