const express = require("express");
//Requiring model so that it is using the course schema 
const courseModel = require("../models/courseModels");
const app = express();

//at route "/courses" log all the courses in collection
app.get("/courses", async (req, res) => {
    const courses = await courseModel.find({});
    try {
        console.log("Printing all courses:")
        console.log(courses)
        res.send(courses);
    } catch (error) {
        res.status(500).send(error);
    }
  })

module.exports = app