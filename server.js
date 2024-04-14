const express = require('express');
const path = require('path');
const app = express();
const bodyparser = require('body-parser');
const session = require('express-session');
const nocache = require('nocache');
//uuid creation for generation of token
const {v4:uuidv4} = require('uuid');
//router path setting
const route = require('./router')
app.use(nocache());
app.set("view engine",'ejs');
//load static assets
app.use('/static',express.static(path.join(__dirname,'public')))
//insert background
app.use('/assets',express.static(path.join(__dirname,'public/assets')))
app.use('/images',express.static(path.join(__dirname,'views/images')))
//use body parser
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
//use session module
app.use(session({
    secret:uuidv4(), //to create secret keys and unique
    resave:false,
    saveUninitialized:true
}));
//route use app.use
const port = process.env.PORT || 3000;
app.use('/route',route)
//home route
app.get("/",(req,res)=>{
    res.render("base",{title:"login system"});
})
app.listen(port,()=>{
    console.log("server is running on http://localhost:3000");
});