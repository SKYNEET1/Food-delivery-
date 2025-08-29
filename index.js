const express = require('express');
const dbConnect = require('./config/database');
const router = require('./route/routes');
const app = express();
require('dotenv').config();
const cookieParser = require('cookie-parser');

// middleware
app.use(express.json());
app.use(cookieParser());
app.use('/api',router);

PORT = process.env.PORT || 4000;
app.listen(PORT,()=>{
    console.log(`Server is listening at PORT:${PORT}`)
})

dbConnect();