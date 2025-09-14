const express = require('express');
const dbConnect = require('./config/database');
const userRouter = require('./route/userRouter');
const app = express();
require('dotenv').config();
// const path = require('path');
// const http = require('http');

// const server = http.createServer(app);
// const { init } = require('./utils/socket.io');
// init(server); // initialize once


const cookieParser = require('cookie-parser');
const consumerRouter = require('./route/consumerRouter');
const adminRouter = require('./route/adminRouter');
const resturantRouter = require('./route/resturantRouter');
const deliveryRouter = require('./route/deliveryAgentRouter');
const webHookRouter = require('./route/webHookRouter');


// middleware
// app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cookieParser());

app.use('/api', userRouter);
app.use('/api', consumerRouter);
app.use('/api', adminRouter);
app.use('/api', resturantRouter)
app.use('/api', deliveryRouter)
app.use('/',webHookRouter)

PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is listening at PORT:${PORT}`)
})

dbConnect();
