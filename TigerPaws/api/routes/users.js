const express = require("express");
const userModel = require("../models/userModels");
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post("/userLogin", async(req, res) => {
    //req.body.email are referencing the email variable in the received request body
    const email = req.body.email
    const pwd = req.body.pwd
    //This is assuming that it is not possible for two different accounts to have the same
    //email and password
    const userMatches = await userModel.find({password: pwd, email: email}).exec();
    console.log("request made")
    console.log(email)
    console.log(pwd)
    console.log(userMatches)
    if (userMatches == null) {
        console.log("No such user found. Make sure username and password are correct.")
        //send response
    } else {
      //Here is where we'd say render this page
      //if successfull got to another page
      //render then res.send?
    }
  
  })

module.exports = app