const express = require('express');
const mongoose = require('mongoose')
const router = require("./routes/user-routes");
const cookieParser = require('cookie-parser')
const cors = require("cors")
require('dotenv').config();
const app= express();
// app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
const corsOptions = {
    credentials: true,
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 204,
  };
  
  app.use(cors(corsOptions));
 app.use(cookieParser());
app.use(express.json());
app.use('/api',router);
mongoose.connect(`mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@cluster0.f3e1pxb.mongodb.net/mern-auth`).then(()=> {
    app.listen(5000);
    console.log("database connected and listening in 5000")
}).catch((err) => {
    console.log(err)
})
// password:18UnbuxKp5q8OEev