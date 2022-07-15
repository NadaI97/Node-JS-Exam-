const commentModel = require("../../../DB/Model/comment");
const productModel = require("../../../DB/Model/product");
const { getIo } = require("../../../services/socket");



const createComment = async (req,res)=>{

    try {
 
     const {text} =req.body;
     const createdBy = req.user._id
     const {productID}= req.params
 

     const findProduct = await productModel.findOne({id: productID }, {isDeleted:false});

    if (!findProduct || findProduct.isDeleted) {

        res.status(404).json({message: "Product not found"})
    }else{

        const newComment = new commentModel({text, createdBy ,productID });
 
        const addComment = await newComment.save();
    
        getIo().emit('reply', [newComment])

        await productModel.findByIdAndUpdate(productID, {$push:{comments: addComment._id}});
    
        res.status(201).json({message: "Done", addComment})

    }
    
 
    } catch (error) {
     
     res.status(500).json ({message: "Internal server error", error})
 
    }
 
 
 }


const replyOnComment = async (req, res)=>{

    try {
 
        const {text} =req.body;
        const createdBy = req.user._id
        const {productID, commentID}= req.params
    

        const findProduct = await productModel.findOne({id: productID }, {isDeleted:false});

        if (!findProduct || findProduct.isDeleted) {
    
            res.status(404).json({message: "Product not found"})
        }else{

            const findComment = await commentModel.findById(commentID);

                if (!findComment) {
                    
                    res.status(403).json({message:"Comment does not exist"})
                        
                    
           
                }else{

                const newComment = new commentModel({text, createdBy ,productID });
        
                 const addComment = await newComment.save();

                await commentModel.findByIdAndUpdate(commentID, {$push:{replys: addComment._id}}, {new:true});

                res.status(403).json({message:"Reply added"})

                }
              
            
        

        }
        
    
       } catch (error) {
        
        res.status(500).json ({message: "Internal server error", error})
    
       }
}


const likecomment = async (req, res)=>{

    try {
 
     const {id}= req.params;
 
     const comment = await commentModel.findById(id);
 
     if (!comment) {
 
         res.status(404).json({message: "Comment not found"})
 
     } else {
 
         if (id == comment.createdBy) {
 
             res.status(400).json({message: "Can't like your own comment"})
 
             
         } else {
 
             await commentModel.findByIdAndUpdate(comment._id, {$push:{likes:req.user._id}})
             res.status(200).json({message: "Done"})
         }
         
 
     }
    } catch (error) {
             res.status(500).json({message: "Error", error})
 
    }
 }
 
 
 const Unlikecomment= async (req, res)=>{
 
     try {
         
     const {id}= req.params;
 
    const comment = await commentModel.findById(id);
 
     if (!comment) {
 
         res.status(404).json({message: "comment not found"})
 
     } else {
         await commentModel.findByIdAndUpdate(product._id, {$pull:{likes:req.user._id}})
         res.status(200).json({message: "Done"})
 
     }
     } catch (error) {
 
         res.status(500).json({message: "Error", error})
 
         
     }
 }


 const deleteComment = async (req,res)=>{

    try {
     const {productID, commentID}= req.params
 
     const findProduct = await productModel.findOne({_id: productID , isDeleted: false});
 
     if (!findProduct) {
 
         res.status(404).json({message: "Product not found"})
         
     } else {
         
        const findComment = await commentModel.findById(commentID);

        if (!findComment) {
            
            res.status(403).json({message:"Comment does not exist"})
        }else{

         if (findProduct.createdBy.toString() == req.user._id.toString() || findComment.createdBy.toString() == req.user._id.toString()) {
 
             await commentModel.findByIdAndDelete(findComment._id);
             res.status(200).json({message: "Comment Deleted"})
     
             } else {
     
                 res.status(403).json({message:"You are not auth"})
             }
                
             
            }
             }
    } catch (error) {
 
     res.status(500).json({message: "Error", error})
 
    }
         
 
 }
 
 
 
 const updateComment = async (req, res)=>{
 
     try {
 
    const {productID, commentID} = req.params
     const {text} = req.body;
 
     const findProduct = await productModel.findOne({_id: productID , isDeleted: false});
 
     if (!findProduct) {
 
         res.status(404).json({message: "Product not found"})
 
     } else {
         
            const findComment = await commentModel.findById(commentID);
    
            if (!findComment) {
                
                res.status(403).json({message:"Comment does not exist"})
            }else{
    
             if (findComment.createdBy.toString() == req.user._id.toString()) {
     
                 await commentModel.findByIdAndUpdate(findComment._id, {text} , {new:true});

                 res.status(200).json({message: "Comment updated"})
         
                 } else {
         
                     res.status(403).json({message:"You are not auth"})
                 }
             
     
         
   
    }

    }
} catch (error) {
         
    res.status(500).json({message: "Error", error})

}
}


 module.exports = {

    createComment,
    replyOnComment,
    likecomment,
    Unlikecomment,
    deleteComment,
    updateComment
 }