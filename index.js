const express = require('express');
const dbConnect = require('./config/database');
const userRouter = require('./route/userRouter');
const app = express();
require('dotenv').config();
const cookieParser = require('cookie-parser');
const consumerRouter = require('./route/consumerRouter');
const adminRouter = require('./route/adminRouter');
const resturantRouter = require('./route/resturantRouter');

// middleware
app.use(express.json());
app.use(cookieParser());

app.use('/api',userRouter);
app.use('/api',consumerRouter);
app.use('/api',adminRouter);
app.use('/api',resturantRouter)

PORT = process.env.PORT || 4000;
app.listen(PORT,()=>{
    console.log(`Server is listening at PORT:${PORT}`)
})

dbConnect();