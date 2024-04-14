var express = require('express');
var router = express.Router();

//the prebuild login data
const Credential={
    email:"admin@gmail.com",
    password:"123"

}



//login user route
router.post('/login',(req,res)=>{
    if (req.body.email == Credential.email && req.body.password == Credential.password) {
        req.session.user = req.body.email;
        res.redirect('/route/dashboard');
        // res.end("login successful")
    }else{
        res.end("invalid username")
    }
});
//login successful and will redirect to dashboard
router.get('/dashboard',(req,res)=>{
    if (req.session.user) {
        //success message passed
        res.render('dashboard',{user:req.session.user});
        req.session.destroy(); // Destroy the session
    }else{
        res.send("login timeout");
    }
})
//route of logout
router.get('/logout',(req,res)=>{
    req.session.destroy(function (err) {
        if (err) {
            
            console.log(err);
            res.send("error")
        }else{
            // res.redirect('/?invaild=true')
            res.render('base',{title:"express",logout:"logout successfully.."})
        }
    })
})
//exports the router

module.exports = router;