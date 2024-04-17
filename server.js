const express = require('express');
const path = require('path');
const app = express();
const bodyparser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
//uuid creation for generation of token
const {v4:uuidv4} = require('uuid');
const nocache = require('nocache');


//router path setting
const route = require('./router')
app.use(cookieParser());
app.set("view engine",'ejs');


//load static assets
app.use('/static',express.static(path.join(__dirname,'public')))
//insert background
app.use('/assets',express.static(path.join(__dirname,'public/assets')))
//use body parser
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:false}))
//use session module
app.use(session({
    secret:uuidv4(), //to create secret keys and unique
    resave:false,  // Set to true to force the session to be saved back to the session store
    saveUninitialized:false // Set to 'true' for HTTPS in production
}));
app.use(nocache());
//route use app.use
const port = process.env.PORT || 8000;
app.use('/route',route)
//home route
app.get("/",(req,res)=>{
    if(!req.session.user){
        res.render("base",{title:"login system"});
    }
    else{
        res.render('dashboard')
    }
})
app.listen(port,()=>{
    console.log("server is running on http://localhost:8000");
});