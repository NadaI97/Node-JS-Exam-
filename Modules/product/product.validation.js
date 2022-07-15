
const Joi = require('joi');

const createProduct = {
    body: Joi.object().required().keys({
        title:Joi.string().required(),
        descrption: Joi.string(),
        price:Joi.number().required()

        
    })
}

const likeProduct = {

    params: Joi.object().required().keys({

        id: Joi.string().min(24).max(24)

    })
}

const updateProduct = {
    body: Joi.object().required().keys({
        title:Joi.string().required(),
        descrption: Joi.string(),
        price:Joi.number().required()

        
    })
}


const deleteProduct = {

    params: Joi.object().required().keys({

        id: Joi.string().min(24).max(24)

    })

}


module.exports = {

    createProduct,
    likeProduct,
    updateProduct,
    deleteProduct

}