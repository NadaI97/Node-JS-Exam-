const { auth } = require('../../middleware/auth');
const validation = require('../../middleware/validation');
const endpoint = require('./comment.endPoint');
const validators = require ('./comment.validation')
const controller = require('./controller/comment')
const router = require ('express').Router();


router.post ('/addComment/:productID',validation(validators.createComment), auth(endpoint.createComment), controller.createComment )
router.post ('/:productID/addReply/:commentID',validation(validators.creatReply), auth(endpoint.createComment), controller.replyOnComment )


router.patch ('/like/:id', validation(validators.likecomment), auth(endpoint.like), controller.likecomment)
router.patch ('/unlike/:id', validation(validators.likecomment), auth(endpoint.like), controller.Unlikecomment)

router.patch ('/:productID/update/:commentID', validation(validators.updateComment), auth(endpoint.updateAndDelete), controller.updateComment)
router.delete ('/:productID/delete/:commentID', validation(validators.deleteComment), auth(endpoint.updateAndDelete), controller.deleteComment)

module.exports = router