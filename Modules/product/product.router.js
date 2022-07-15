const router = require ('express').Router();
const validation = require('../../middleware/validation');
const validators = require ('./product.validation')
const { auth } = require('../../middleware/auth');
const control = require ('./controller/productAndLike');
const updatesAndDeletes = require('./controller/updateAndDelete')
const endpoint = require('./product.endpoint');

router.post ('/newProduct',validation(validators.createProduct),auth(endpoint.creatProduct), control.createProduct);

router.patch ('/like/:id', validation(validators.likeProduct), auth(endpoint.creatProduct), control.likeProduct)
router.patch ('/unlike/:id', validation(validators.likeProduct), auth(endpoint.creatProduct), control.UnlikeProduct)

router.patch ('/updatePost/:id', validation(validators.updateProduct), auth(endpoint.updateProduct),updatesAndDeletes.updateProduct )

router.patch ('/softDelete/:id', validation(validators.deleteProduct), auth(endpoint.softDelete), updatesAndDeletes.softDelete)
router.delete ('/delete/:id', validation(validators.deleteProduct), auth(endpoint.softDelete), updatesAndDeletes.deleteProduct)

router.patch('/addToWishList/:id', validation(validators.likeProduct), auth(endpoint.updateProduct), control.addToWishList)
router.patch ('/hideProduct/:id', validation(validators.likeProduct), auth(endpoint.updateProduct), updatesAndDeletes.hideProduct)

module.exports = router
