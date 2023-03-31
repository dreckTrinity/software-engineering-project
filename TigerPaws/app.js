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
app.route("/student-page").get((req,res) => {
    res.render('pages/student-page');
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
