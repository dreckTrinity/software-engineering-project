const express = require("express");
const userModel = require("../models/userModels");
const courseModel = require("../models/courseModels")
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const path = require('path')

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
      } else if(role == 'student'){
        res.render(path.join(__dirname, '/../../views/pages/student-page.ejs'))
      }
      //if successfull got to another page
      //render then res.send?

      //render this page
      
    }
  
  })

  app.post("/viewCourses", async(req, res) =>{
    const email = req.body.email //We use email because it should be unique for every user
    const password = req.body.password //To make sure people cant just sign anyone up for any class

    const userMatches = await userModel.find({email: email,password: password}).exec();

    if(userMatches.length == 0) {
      console.log("No such user found. Make sure email or password is correct")
      res.render(path.join(__dirname, '/../../views/pages/viewCourses.ejs'))
    } else {
      const courses = userMatches[0].registeredCourses

      const courseMatch = await courseModel.findById(id)


      res.render(path.join(__dirname, '/../../views/pages/registered-courses.ejs') , {courses:courseMatch})

    }

  })

  app.post("/register", async(req, res) =>{

    //Gets info from the HTML form
    const email = req.body.email //We use email because it should be unique for every user
    const password = req.body.password //To make sure people cant just sign anyone up for any class
    const course = req.body.course //This is hopefully a stand in until we can implement a better method

    //Access user database, if we have a user then add course to the database
  

    const userMatches = await userModel.find({email: email,password: password}).exec();

    if(userMatches.length == 0) {
      console.log("No such user found. Make sure email or password is correct")
      res.render(path.join(__dirname, '/../../views/pages/register.ejs'))
    } else {

      const courseMatch = await courseModel.find({name: course})

      if(courseMatch.length == 0){
        res.render(path.join(__dirname, '/../../views/pages/register.ejs'))
        console.log("No course found, Make sure course name is correct")

      } else {
        user = userMatches[0] //Get the one user out of the Array
        courseID = courseMatch[0]._id.toString
        const filter = {email: email}
  
        const updateDoc = {
          $push: {
            registeredCourses: courseID
          }
        }
        
        const result = await userModel.updateOne(filter, updateDoc)
        console.log("Got here")
        console.log(result)

        res.render(path.join(__dirname, '/../../views/pages/student-page.ejs'))
      }
      }
  })

module.exports = app