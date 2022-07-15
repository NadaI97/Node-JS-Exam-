const userModel = require("../../../DB/Model/user")


const softDelete = async (req,res)=>{

    try {
        const {id}= req.params

    const findUser = await userModel.findOne({_id:id });

    if (!findUser || findUser.isDeleted) {

        res.status(404).json({message: "User not found"})
        
    } else {

        if (findUser.role == "Admin" && findUser._id.toString() == req.user._id.toString()) {

        await userModel.findByIdAndUpdate(findUser._id, {isDeleted: true}, {new: true});
        res.status(200).json({message: "User Deleted"})

        } else {

            res.status(403).json({message:"You are not auth"})
        }
        

    }
    } catch (error) {
        
        res.status(500).json({message:"Error", error})
    }



}


const deleteUser = async (req,res)=>{

    try {
        const {id}= req.params

    const findUser = await userModel.findOne({_id: id , isDeleted: false});

    if (!findUser) {

        res.status(404).json({message: "User not found"})
        
    } else {
        if (findUser.role == "Admin" && findUser._id.toString() == req.user._id.toString()) {
            await userModel.findByIdAndDelete(id);
             res.status(200).json({message: "Admin Deleted"})
        } else {

            if (findUser.role == "User")  {

                if (findUser._id.toString() == req.user._id.toString()|| req.user.role == "Admin" ) {
                    await userModel.findByIdAndDelete(id);
                    res.status(200).json({message: "User Deleted"})
                }else{

                    res.status(403).json({message:"You are not authorized user"})

                }
               
            }else{

                res.status(403).json({message:"You are not auth"})


            }
            
        }
        

    }
    } catch (error) {
        
        res.status(500).json({message:"Error", error})
    }



}



module.exports = {

    softDelete,
    deleteUser
}