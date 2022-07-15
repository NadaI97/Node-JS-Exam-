const productModel = require("../../../DB/Model/product");
const userModel = require("../../../DB/Model/user");
const QRCode = require('qrcode');
const { getIo } = require("../../../services/socket");



const createProduct = async(req,res)=>{

   try {

    const {title , descrption, price} =req.body;
    const createdBy = req.user._id

    const newProduct = new productModel({title, descrption,price , createdBy});

    const addProduct = await newProduct.save();

    getIo().emit('reply', [newProduct])

   const productQrCode =  await QRCode.toDataURL(`title : ${newProduct.title} description ${newProduct.descrption} price ${newProduct.price} CreatedBy ${newProduct.createdBy}` )
        
        

    await userModel.findByIdAndUpdate(req.user._id, {$push:{products: addProduct._id}});

    

    res.status(201).json({message: "Done", addProduct, productQrCode})

   } catch (error) {
    
    res.status(500).json ({message: "Internal server error", error})

   }


}


const likeProduct = async (req, res)=>{

    try {
 
     const {id}= req.params;
 
     const product = await productModel.findById(id);
 
     if (!product) {
 
         res.status(404).json({message: "product not found"})
 
     } else {
 
         if (id == product.createdBy) {
 
             res.status(400).json({message: "Can't like your own product"})
 
             
         } else {
 
             await productModel.findByIdAndUpdate(product._id, {$push:{likes:req.user._id}})
             res.status(200).json({message: "Done"})
         }
         
 
     }
    } catch (error) {
             res.status(500).json({message: "Error", error})
 
    }
 }
 
 
 const UnlikeProduct = async (req, res)=>{
 
     try {
         
     const {id}= req.params;
 
    const product = await productModel.findById(id);
 
     if (!product) {
 
         res.status(404).json({message: "product not found"})
 
     } else {
         await productModel.findByIdAndUpdate(product._id, {$pull:{likes:req.user._id}})
         res.status(200).json({message: "Done"})
 
     }
     } catch (error) {
 
         res.status(500).json({message: "Error", error})
 
         
     }
 }


 const addToWishList = async (req, res)=>{

        try {
            const{id}= req.params;

            const findProduct = await productModel.findById(id);
        
            if (!findProduct) {
        
                res.status(404).json({message:"Product not found"});
                
            }else{
        
                const wishList = req.user.wishList;
        
                if (wishList.includes(findProduct._id)) {
        
                    res.status(403).json({message:"Product is already in your wishlist"});
        
                    
                }else{
        
                    await userModel.findByIdAndUpdate(req.user._id, {$push:{wishList: findProduct._id}});
        
                    await productModel.findByIdAndUpdate(findProduct._id, {$push:{wishList:req.user._id}});
        
                    res.status(200).json(({message:"Proudct added to your wishlist"}))
        
                    
                }
            }
        } catch (error) {
            
            res.status(500).json({message: "Error", error})
        }
 }





module.exports={

    createProduct,
    likeProduct,
    UnlikeProduct,
    addToWishList
}