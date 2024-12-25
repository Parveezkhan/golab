const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path')

const app = express();
const Port = 3000;

const authRouter = require('./src/Routes/authRoutes')

dotenv.config({path:"./.env"})
app.use(cors())
app.use(express.json())
// app.use("*",(req,res)=>{
//     res.json("Hello from Backend")
// })
app.use('/api/v1',authRouter);



app.listen(Port,()=>{
    console.log(`Server Started at Port: ${Port}`);
})


