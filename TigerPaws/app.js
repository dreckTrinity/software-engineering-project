const express = require('express');
const bodyParser = require('body-parser');
const app = express();
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
const Router = require("./api/routes/courses")
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
    res.render('pages/login.ejs');
});

app.route("/login").get((req, res) => {
    res.render('pages/login.ejs');
});

app.route("/successfulLogin").get((req, res) => {
    res.render('pages/successfulLogin.ejs');
});

//Using router const, duh
app.use(Router)

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

