const productModel = require("../../../DB/Model/product");





const softDelete = async (req,res)=>{

   try {
    
    const {id}= req.params

    const findProduct = await productModel.findOne({_id:id });

    if (!findProduct || findProduct.isDeleted) {

        res.status(404).json({message: "Product not found"})
        
    } else {

        if (req.user.role == "Admin" || findProduct.createdBy.toString() == req.user._id.toString()) {

        await productModel.findByIdAndUpdate(findProduct._id, {isDeleted: true}, {new: true});
        res.status(200).json({message: "Product Deleted"})

        } else {

            res.status(403).json({message:"You are not auth"})
        }
        

    }
   } catch (error) {
    
    res.status(500).json({message: "Error", error})

   }



}


const deleteProduct = async (req,res)=>{

   try {
    const {id}= req.params

    const findProduct = await productModel.findOne({_id: id , isDeleted: false});

    if (!findProduct) {

        res.status(404).json({message: "Product not found"})
        
    } else {
        
        if (req.user.role == "Admin" || findProduct.createdBy.toString() == req.user._id.toString()) {

            await productModel.findByIdAndDelete(findProduct._id);
            res.status(200).json({message: "Product Deleted"})
    
            } else {
    
                res.status(403).json({message:"You are not auth"})
            }
               
            

            }
   } catch (error) {

    res.status(500).json({message: "Error", error})

   }
        

}



const updateProduct = async (req, res)=>{

    try {

        const {id} = req.params
    const {title, descrption, price} = req.body;

    const findProduct = await productModel.findOne({_id: id , isDeleted: false});

    if (!findProduct) {

        res.status(404).json({message: "Product not found"})

    } else {
        
        if (findProduct.createdBy.toString() == req.user._id.toString()) {

            await productModel.findByIdAndUpdate(findProduct._id ,{title, descrption, price}, {new: true});
            
            res.status(200).json({message: "Product Updated"})
    
            } else {
    
                res.status(403).json({message:"You are not auth"})
            }
            
    
        }
    } catch (error) {
        
                 res.status(500).json({message: "Error", error})

    }
    }


const hideProduct = async(req, res)=>{

    try {
        const{id}= req.params;

        const findProduct = await productModel.findById(id);
    
        if (!findProduct) {
    
            res.status(404).json({message:"Product not found"});
            
        }else{
            
            const hidden = findProduct.hidden
            if (hidden.includes(req.user._id)) {
    
                res.status(403).json({message:"Product is already hidden"});
    
                
            }else{
                if ((findProduct.createdBy.toString) == (req.user._id).toString) {

                    res.status(403).json({message:"You can't hide your own product"});

                }else{

                    await productModel.findByIdAndUpdate(findProduct._id, {$push:{hidden:req.user._id}});
    
                    res.status(200).json(({message:"Proudct added to your hidden list"}))
        
                }
               
                
            }
        }
    } catch (error) {
        
        res.status(500).json({message: "Error", error})
    }
}    



module.exports  ={

    softDelete,
    deleteProduct,
    updateProduct,
    hideProduct
}