

const Joi = require('joi');


const signup = {
    body: Joi.object().required().keys({
        firstName:Joi.string().required().pattern(new RegExp(/[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{1,20}$/)).messages({
            'any.required':"please send your name"
        }),
        lastName:Joi.string().required().pattern(new RegExp(/[A-Z][a-zA-Z][^#&<>\"~;$^%{}?]{1,20}$/)).messages({
            'any.required':"please send your name"
        }),
        email:Joi.string().email().required(),
        password:Joi.string().required().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)),
        cPassword:Joi.string().valid(Joi.ref('password')).required()
    })
}


const confirmEmail = {
    params: Joi.object().required().keys({
        token:Joi.string().required(),
    })
}




const login = {
    body: Joi.object().required().keys({
        email:Joi.string().email().required(),
        password:Joi.string().required().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)),
       
    })
}



const softDelete = {
    body: Joi.object().required().keys({
        id:Joi.string().min(24).max(24).required(),
    })

}




const deleteUser = {
    params: Joi.object().required().keys({
        id:Joi.string().min(24).max(24).required(),
    })

}


const updateProfile = {
    params: Joi.object().required().keys({
        email:Joi.string().email().required(),
        oldPassword:Joi.string().required().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)),
        password:Joi.string().required().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)),
        cPassword:Joi.string().valid(Joi.ref('password'))
    })

}

const sendCode = {
    body: Joi.object().required().keys({
        email:Joi.string().email()
    })

}

const forgetPassword = {
    body: Joi.object().required().keys({
        email:Joi.string().email(),
        code:Joi.number().required(),
        newPassword:Joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)),
        cPassword:Joi.string().valid(Joi.ref('newPassword'))
    })

}
module.exports =  {
    signup,
    confirmEmail,
    login,
    softDelete,
    deleteUser,
    updateProfile,
    sendCode,
    forgetPassword

}