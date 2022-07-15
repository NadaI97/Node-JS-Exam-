require('dotenv').config()
const express = require ('express');
const path = require('path');
const connectDB = require('./DB/connection');
const { createInvoice } = require("./services/pdf");
const allRouter = require ('./Modules/AllRouter');
const schedule = require('node-schedule');
const sendEmail = require('./services/sendEmail');
const app = express();
const cors = require("cors");
const {initIO} = require('./services/socket');
const userModel = require('./DB/Model/user');
app.use(cors())
const port = process.env.PORT;

app.use(express.json());

app.use('/uploads' , express.static(path.join(__dirname , './uploads')))

app.use('/api/v1/user', allRouter.userRouter )
app.use('/api/v1/product', allRouter.productRouter )
app.use('/api/v1/comment', allRouter.commentRouter )



const invoice = {
  shipping: {
    id: "day",
    title: "month",
    description: "year"
   
  },
  items: [
    {
      item: ``,
      description: ``,
      quantity: ``,
      amount: ``
    },
    {
      item: "USB_EXT",
      description: "USB Cable Extender",
      quantity: 1,
      amount: 2000
    }
  ],
  subtotal: 8000,
  paid: 0,
  invoice_nr: 1234
};

createInvoice(invoice, path.join(__dirname , './uploads/PDF/products.pdf'));




const job = schedule.scheduleJob('59 59 23', function(){

// sendEmail(`nada.metaweh97@gmail.com`,`<p>open todays products</p>`, [
//     {
//         filename: 'products.pdf',
//         path:path.join((__dirname , './uploads/PDF/products.pdf'))
//     }
// ])
});

connectDB()
const server = app.listen (port, ()=>{

    console.log("running...");
})

const io  = initIO(server)

io.on('connection' , (socket)=>{

    socket.on("updateSocketID" , async (data)=>{
        await userModel.findByIdAndUpdate(data , {socketID:socket.id})
    })
    console.log(socket.id);
})