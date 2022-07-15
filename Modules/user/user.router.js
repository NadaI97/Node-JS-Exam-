const router = require ('express').Router();
const validation = require('../../middleware/validation');
const validators = require('./user.validation');
const control = require ('./controller/registration');
const deletes = require ('./controller/deleteUser');
const { auth, Roles } = require('../../middleware/auth');
const endpoint = require('./user.endPoint');
const multerData = require ('../../services/multer');
const updates = require ('./controller/updateUser');
const getAllUsers = require('./getAll');


router.post('/signUp', validation(validators.signup), control.signUp )
router.get('/confirmEmail/:token', validation(validators.confirmEmail), control.confirmEmail)
router.post('/signIn', validation(validators.login), control.signIn)

router.patch('/softDelete/:id', validation(validators.softDelete), auth(endpoint.softDelete), deletes.softDelete )
router.delete('/deleteUser/:id', validation(validators.deleteUser),auth(endpoint.deleteUser) ,deletes.deleteUser )

// router.patch('/updateProfile', validation(validators.updateProfile), auth(endpoint.updateProfile), updates.updateProfile  )

router.patch("/profile/profilePic",
    multerData.myMulter('users/profilePic', multerData.customValidation.image).array('image', 5),
    auth(endpoint.updateProfile), updates.updateProfilePic)

router.patch("/profile/coverPic",
    multerData.myMulter('users/coverPic', multerData.customValidation.image).array('image', 5),
    auth(endpoint.updateProfile), updates.updateProfileCoverPic)



router.post('/sendCode' ,validation(validators.sendCode), updates.sendCode)
router.patch('/forgetPassword' ,validation(validators.forgetPassword) ,updates.forgetPassword)


router.get('/getAll', getAllUsers)




module.exports = router