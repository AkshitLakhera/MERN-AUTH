const express = require('express');
const mongoose = require('mongoose')
require('dotenv').config();
const app= express();
const router = require("./routes/user-routes");
const cookieParser = require('cookie-parser')
const cors = require("cors")
app.use(cors({ credentials: true, origin: ' http://localhost:5173' }));
app.use(express.json());
app.use('/api',router);
app.use(cookieParser());
mongoose.connect(`mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@cluster0.f3e1pxb.mongodb.net/mern-auth`).then(()=> {
    app.listen(5000);
    console.log("database connected and listening in 5000")
}).catch((err) => {
    console.log(err)
})
// password:18UnbuxKp5q8OEev