const express = require("express");
const userModel = require("../models/userModels");
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const path = require('path')
const express = require('express');
const cookieParser = require('cookie-parser');

app.use(cookieParser());

app.post("/userLogin", async(req, res) => {
    //req.body.email is referencing the email variable in the received request body
    const email = req.body.email
    const pwd = req.body.pwd
    //This is assuming that it is not possible for two different accounts to have the same
    //email and password, which Trinity ensures because they give unique emails

    //searches database for a document where password field matches pwd, and email field matches email
    //returns an array, either empty or containing the matching account
    const userMatches = await userModel.find({password: pwd, email: email}).exec();
    console.log("request made")
    console.log(email)
    console.log(pwd)
    console.log(userMatches)

    if (userMatches.length == 0) {
        console.log("No such user found. Make sure username and password are correct.")
        res.render(path.join(__dirname, '/../../views/pages/login-remake.ejs'))
        //send response
    } else {
      var user = userMatches[0];
      var role = user.userType;
      if(role == 'admin'){
        res.render(path.join(__dirname, '/../../views/pages/administrator-remake.ejs'))
      }else if(role == 'professor'){
        res.render(path.join(__dirname, '/../../views/pages/professor-page-remake.ejs'))
      } else {
        res.render(path.join(__dirname, '/../../views/pages/student-page.ejs'))
      }
      //if successfull got to another page
      //render then res.send?

      //render this page
      
      
    }
    // create a cookie
    const userId = cookie1
    const cookieOptions = {
      maxAge: 24 * 60 * 60 * 1000, // cookie will expire in 24 hours
      httpOnly: true, // cookie can only be accessed via HTTP(S)
      signed: true // cookie will be signed
  };
  res.cookie('userId', userId, cookieOptions);

  res.send('You are logged in!');
    
    

  
  })

module.exports = app