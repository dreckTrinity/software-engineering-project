const express = require("express");
//Requiring model so that it is using the course schema 
const courseModel = require("../models/courseModels");
const app = express();
//Body parser is necessary because it is used to understnad
//the request body
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
const path = require('path')

//at route "/courses" log all the courses in collection
app.get("/courses", async (req, res) => {
    const courses = await courseModel.find({});
    try {
        console.log("Printing all courses:")
        console.log(courses)
        res.status(200).send(courses);
    } catch (error) {
        res.status(500).send(error);
    }
  })

  app.post("/courseSearch", async(req, res) => {
    const course = req.body.course
    console.log("request made")
    console.log(course)
    
    const courseMatches = await courseModel.find({courseNum: course}).exec();
    console.log(courseMatches)
    if(courseMatches.length == 0){
      console.log("No course found. Try harder please")
      res.render(path.join(__dirname, '/../../views/pages/course-search-page.ejs'))
    } else {
      res.render(path.join(__dirname, '/../../views/pages/course-list-page.ejs') , {courses:courseMatches})
    }
    //print courses into log
  })
module.exports = app