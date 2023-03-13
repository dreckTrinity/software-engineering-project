const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

app.route("/").get((req, res) => {
    res.render('pages/login.ejs');
});

app.route("/login").get((req, res) => {
    res.render('pages/login.ejs');
});

app.route("/professor-page").get((req, res) => {
    res.render('pages/professor-page.ejs');
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
