const userModel = require("../../DB/Model/user")
const paginate = require("../../services/paginate")

const select  ='firstName email';
const getUsers =[
    
        {
            path: 'products',
            match: { isDeleted: false },
            populate: [
                {
                    path: 'createdBy',
                    select
                },  {
                    path: 'wishList',
                    match: { isDeleted: false },
                        populate: [
                            {
                                path: 'createdBy',
                                select
                            }]
                },{
                    path: 'likes',
                    select
        
                },{
                    path: 'comments',
                    match: { isDeleted: false },
                    populate: [
                        {
                            path: 'createdBy',
                            select
                        },
                        {
                            path: 'replys',
                            populate: [{
                                path: 'createdBy',
                                select
                            }
                            ],
                        }
                    ]
                }
            ]
  
        }]
       
    

const getAllUsers = async (req, res)=>{
   try {
    const {page, size}= req.query;
    const {limit, skip} = paginate(page, size);

    const allUsers = await userModel.find({}).populate(getUsers).limit(limit).skip(skip)

    res.status(200).json({message: "Done", allUsers})
   } catch (error) {
    res.status(500).json({message:"Error", error})
   }
}


module.exports = getAllUsers