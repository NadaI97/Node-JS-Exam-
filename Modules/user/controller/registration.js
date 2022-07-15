const userModel = require("../../../DB/Model/user");
const sendEmail = require("../../../services/sendEmail");
const jwt = require ('jsonwebtoken');
const bycrypt = require ('bcryptjs');
const QRCode = require('qrcode')



const signUp = async (req, res)=>{

   try {
    
    const {firstName, lastName, email, password} = req.body;

    const newUser = new userModel ({firstName, lastName, email, password});

    const savedUser = await newUser.save();

    const token =  jwt.sign ({id: newUser._id}, process.env.emailToken, {expiresIn: 5*60})

    const URL = `${req.protocol}://${req.headers.host}/api/v1/user/confirmEmail/${token}`

    const message =  `<a href=${URL}> please click here to confirm your email</a>`

    const profileLink =`${req.protocol}://${req.headers.host}/api/v1/user/qrCode/${savedUser._id}`;
  
    const profileQrCode =  await QRCode.toDataURL(`${profileLink}`)
    
    await userModel.findByIdAndUpdate (savedUser._id , {qrCode : profileQrCode});

    
    //  sendEmail (savedUser.email, message )

    res.status(200).json({message: "Done"})
    
   } catch (error) {

    if (error.keyValue?.email){
        res.status(500).json ({message: "email already exists"})
    }else{

        res.status(500).json ({message: "Internal server error", error})
    }
   }


   
}


const confirmEmail = async (req, res)=>{

   try {
    
     const token = req.params.token;

    if (!token || token == null || token == undefined) {

        res.status(403).json ({message: "In-valid email token"})
        
    } else {

        const decoded = jwt.verify(token , process.env.emailToken)

        if (!decoded) {
        
            res.status(400).json ({message: "In-valid decoded token"})

        } else {
            
            const findUser = await userModel.findById(decoded.id).select('confirmEmail')

            if (!findUser) {
                
                res.status(404).json ({message: "In-valid User"})

            } else {
                if (findUser.confirmEmail) {
                
                    res.status(404).json ({message: "Email already confirmed"})

            }else{

                const updateUser = await userModel.findByIdAndUpdate(findUser._id, {confirmEmail: true}, {new: true})

                res.status(200).json ({message: "Email confirmed, you can login now"});

            }
        }
        
    }
    }
   } catch (error) {

    res.status(500).json ({message: "Internal server error", error})
    }

    
   }


const signIn = async (req, res)=>{

  try {
    const {email, password}= req.body;

    const findUser = await userModel.findOne({email});

    if (!findUser){

        res.status(404).json({message:"User do not exist, please sign up first"})
        
          }else{
            if (!findUser.confirmEmail) {
            
              res.status (400).json ({message: "Please confirm your email first"});
              
            } else {
        
                if (findUser.isDeleted || findUser.isBlocked) {

           res.status (403).json ({message: "You can't login, your account is either deleted or blocked"});

    
                  }else{

                    const match = await bycrypt.compare (password, findUser.password);
        
                    if (!match ) {
                
                      res.status (404).json ({message: "In-valid email or password"}); 
                    }  else {
                      
                      const token = jwt.sign ({id : findUser._id, isLoggedIn: true}, process.env.tokenSecret , {expiresIn: '24h'})
                
                      res.status (200).json ({message: "Welcome", token});
                
                
                    }
                  }
      
        
              
          }
        
    }
  } catch (error) {
    
    res.status(500).json ({message: "Internal server error", error})

  }
}


module.exports = {

    signUp,
    confirmEmail,
    signIn
}


