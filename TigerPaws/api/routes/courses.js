const express = require("express");
//Requiring model so that it is using the course schema 
const courseModel = require("../models/courseModels");
const app = express();
//Body parser is necessary because it is used to understnad
//the request body
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

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

module.exports = app