const mongoose = require("mongoose")
//Schema is essentially describing what the document will look like
const courseSchema = new mongoose.Schema ({
    name: String,
    courseNum: Number,
    courseSectoin: Number,
    courseDept: String,
    instructor: String,
    creditHours: Number,
    pathways: [String],
    prerequisites: [String],
    location: {
        building: String, 
        room: Number
    },
    meetingTime: {
        days: String, 
        startTime: String, 
        endTime: String
    },
    courseDescription: String
})
//The first argument is the singular name of the collection your model is for. 
//Mongoose automatically looks for the plural, lowercased version of your model name.
//Second arg is the schema
const Course = mongoose.model('Course', courseSchema)
module.exports = Course