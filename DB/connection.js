const mongoose = require ('mongoose');

const connectDB = ()=>{
    return mongoose.connect(process.env.DBURL).then(result=> console.log("Connected...."))
    .catch(error => console.log ("Failed to connect", error));

}


module.exports= connectDB