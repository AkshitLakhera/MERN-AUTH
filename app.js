const express = require('express');
const mongoose = require('mongoose')
const app= express();
mongoose.connect('mongodb+srv://admin:18UnbuxKp5q8OEev@cluster0.f3e1pxb.mongodb.net/mern-auth').then(()=> {
    app.listen(5000);
    console.log("database connected and listening in 5000")
}).catch((err) => {
    console.log(err)
})
// password:18UnbuxKp5q8OEev