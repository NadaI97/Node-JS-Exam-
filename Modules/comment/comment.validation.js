
const Joi = require ('joi')


const createComment = {
    body: Joi.object().required().keys({
        text:Joi.string().required(),
        
    }),

    params: Joi.object().required().keys({

        productID: Joi.string().min(24).max(24)

    })
}

const creatReply = {
    body: Joi.object().required().keys({
        text:Joi.string().required(),
        
    }),

    params: Joi.object().required().keys({

        productID: Joi.string().min(24).max(24),
        commentID: Joi.string().min(24).max(24)


    })
}

const likecomment = {

    params: Joi.object().required().keys({

        id: Joi.string().min(24).max(24)

    })
}

const updateComment = {
    body: Joi.object().required().keys({
        text:Joi.string().required(),
        
    }),

    params: Joi.object().required().keys({

        productID: Joi.string().min(24).max(24),
        commentID: Joi.string().min(24).max(24)


    })
}

const deleteComment = {

    params: Joi.object().required().keys({

        productID: Joi.string().min(24).max(24),
        commentID: Joi.string().min(24).max(24)


    })
}


module.exports={

    createComment,
    creatReply,
    likecomment,
    updateComment,
    deleteComment
}