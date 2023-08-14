const express = require('express');
const router = express.Router();
const UserData = require('./mongodatab');


// This post ops happens when the user clicks on login (used with async function)
router.post("/login",async (req,res)=>{
    try{
        
        // store entered credentential here
        store= {
            email : req.body.email,
            password : req.body.password
        }

        
        const result = await UserData.find(store)
        if(store.email == result[0].email && store.password == result[0].password){
            req.session.user = result[0].email;
            console.log(req.session.user)
            res.redirect('/route/dashboard');
        }else{
            res.end("wrong credentials")
        }
    }catch(err){
        console.log(err)
    }
})


// this post operation executes when a new user registers to save user to the database
router.post("/newuserdata",async(req,res)=>{
    try{
        console.log(req.body)
        const record = new UserData(req.body)
        await record.save();
        res.status(200);
        res.redirect("/");
    }catch(err){
        console.log(err)
        res.end("invalid")
    }
    
    
})

// to get signup page
router.get('/signup',(req,res)=>{
    res.render("signup")
})

// router for dashboard
router.get('/dashboard',(req,res)=>{
    if(req.session.user){
        res.render("dashboard",{user : req.session.user})
    }else{
        res.end("Unauthorize User")
    }
})

//router for logout page
router.get("/logout",(req,res)=>{
    req.session.destroy();
    res.render("logout")
})

module.exports = router; // export this module to be used in server.js(in the main base file)