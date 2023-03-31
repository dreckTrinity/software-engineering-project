const express = require('express');
const bodyParser = require('body-parser');
const app = express();

var path = require('path')

//Loads Resources file to let the images load, check login remake for example of how to load an image from Resources
app.use(express.static('public')); 
app.use('/Resources', express.static('Resources'));

//Loads CSS file
app.use(express.static('public'));
app.use('/views/CSS', express.static('CSS'));

app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

//Needed for mongoose
//Had to install mongoose with:
//npm install mongoose --save
// also npm install routes --save
const mongoose = require("mongoose");
//Use to make routes so we can have separate files with HTTP requests
//It's referencing a folder called routes in the same directory where route files would be kept and
//then can be used to handle requests
const RouterCourses = require("./api/routes/courses")
const RouterUsers = require("./api/routes/users")

app.use(express.json());
//connecting to cluster
//I don't know if it was to connect to my account?
mongoose.connect('mongodb+srv://audreydeering:matbis-viqqu6-pArjyz@clustersoftwareengineer.mql7prx.mongodb.net/webAppDatabase?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)
//instance of connection and confirms connection in console log
const db = mongoose.connection
db.on("error", console.error.bind(console, "connection error: "))
db.once("open", function () {
  console.log("Connected successfully");
})



//Routes that can be made into separate files with routes?
app.route("/").get((req, res) => {
    res.render('pages/login-remake.ejs');
});

app.route("/login").get((req, res) => {
    res.render('pages/login-remake.ejs');
});

app.route("/successfulLogin").get((req, res) => {
    res.render('pages/successfulLogin.ejs');
});
app.route("/administrator-remake").get((req,res) => {
    res.render('pages/administrator-remake');
});
app.route("/manage-courses-student").get((req,res) => {
    res.render('pages/manage-courses-student');
});
app.route("/course-list-page").get((req,res) => {
    res.render('pages/course-list-page');
});
app.route("/course-search-page").get((req,res) => {
    res.render('pages/course-search-page')
})
app.route("/student-page").get((req,res) => {
    res.render('pages/student-page')
})
app.route("/professor-page").get((req,res) => {
    res.render('pages/professor-page-remake')
})

//Using router const, duh
app.use(RouterCourses)
app.use(RouterUsers)

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

