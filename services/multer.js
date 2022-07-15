const multer = require ('multer')
const path = require('path')
const fs = require('fs')
const { nanoid } = require('nanoid')
const customValidation = {
    image: ['image/jpeg', 'image/png', 'image/gif']
}
  

const HME  = (err,req,res,next)=>{
    if (err) {
        res.status(400).json({message:"file too large" , err})
    }else{
        next()
    }
}
function myMulter(customPath, validationMethod) {
    if (!customPath || customPath == null) {
        customPath = 'general'
    }
    const fullPath = path.join(__dirname, `../uploads/${customPath}`)
    if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true })
    }
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            req.finialDestination = `uploads/${customPath}`
            cb(null, fullPath)
        },
        filename: function (req, file, cb) {
            cb(null, nanoid() + "_" + file.originalname)
        }
    })
    const fileFilter = function (req, file, cb) {

            if (validationMethod.includes(file.mimetype)) {
              
                cb(null, true)
            } else {
                req.fileErr = true;
                cb(null, false)
            }

    }

    const upload = multer({
        dest: fullPath,
        limits:{fileSize:625000},
        fileFilter,
        storage
    })
    return upload
}


module.exports = {
    myMulter,
    customValidation,
    HME
}