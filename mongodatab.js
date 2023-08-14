const mongoose = require("mongoose");

// connect to the database here
mongoose.connect("mongodb://127.0.0.1:27017/LoginApplication")
.then(()=> console.log("connection successfull"))
.catch((err)=> console.log(err));

// create schema here

const schemaStore = new mongoose.Schema({
    name : {
        type : String,
        required : true     
    },
    email : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    }

})

// create collection here

const UserData = new mongoose.model("UserData", schemaStore);


module.exports = UserData; // export this module to be used in route.js