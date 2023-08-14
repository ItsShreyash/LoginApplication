const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const session = require("express-session");
const path = require("path");
const {v4:uuidv4} = require("uuid");
const router = require("./route");

const port = process.env.PORT || 3000;



// set the view engine here
app.set("view engine", "ejs");


app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}))

// for setting each user session unique use uuidv4
app.use(session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true
}))


// Loading static assets
app.use(express.static(path.join(__dirname, 'public')));

//set the router here with the  url
app.use('/route',router)

// set the default landing page here
app.get('/', (req, res) => {
    res.render("base");
});


// set the listening port here
app.listen(port, () => {
    console.log(`The server is working on the port ${port}`);
});



// Features to be added in future
// 1.Toasts->when user registers in the signup page toasts popups with message 'successfully signed up'
// 2.Forgot Password to retrieve password , can be used with nodemailer to send the credentials to their mail