const express = require("express");
const userModel = require("../models/userModels");
const courseModel = require("../models/courseModels");
const { userTypes } = require('../../functions/authentication/authentication');

const { default: mongoose } = require('mongoose');
const path = require('path');

const router = express.Router();

router.post("/userLogin", async(req, res) => {
  const { email, pwd } = req.body;

  const userMatches = await userModel.find({email: email});

  if (userMatches.length > 1) {
    return res.status(401).json({ error: 'Multiple Users with same email'});
  }

  if (userMatches.length == 0) {
    console.log("No such user found. Make sure username and password are correct.");
    return res.redirect('/');
  }

  const user = userMatches[0];

  // CHECK PASSWORD

  if (user.password != pwd) {
    console.log("Invalid Password");
    return res.redirect('/');
  }

  // REDIRECT DIFFERENT USERS

  if (user.userType === userTypes.STUDENT) {
    req.session.user = user;
    return res.redirect('/student-page');
  } else if (user.userType === userTypes.PROFESSOR) {
    req.session.user = user;
    return res.redirect('/professor-page');
  } else if (user.userType === userTypes.ADMIN) {
    req.session.user = user;
    return res.redirect('/administrator-remake');
  }
  
  return res.status(401).json({ error: 'No user type found'});
});

router.post("/register", async(req, res) =>{
  try{
      //console.log("Inside /register post");
      const classId = new mongoose.Types.ObjectId(req.body.classId);
      console.log(classId);
      //console.log("After ObjectID call");
      const USER = req.session.user
      
      if (USER){
        const userId = req.session.user._id;
        console.log(userId);

        const savedUser = await addToList(userId, classId);

        console.log(savedUser.message);
        res.send(savedUser.message);
      } else {
        console.log("No one is currently logged in so you cannot be registered for a class.");
      }
      //console.log("Before res render");
      //res.render(path.join(__dirname, '/../../views/pages/student-page.ejs'))
      //return res.redirect('/student-page');
      //console.log("After res render");
  } catch (err) {
      //Handle Errors
      console.error(err);
      res.status(500).send('Internal Server Error');
  }
});  

async function addToList(studentId, classId) {
  try {
    const student = await userModel.findById(studentId);
    const classObj = await courseModel.findById(classId);

    console.log("\nAdding " + classObj.name + " to " + student.username.first + "'s Class List\n");

    student.registeredCourses.push(classObj.name);

    console.log(student);

    //classObj.students.push(student._id);

    // Save the updated student document to the User collection
    await student.save().catch(err => {
      console.error('Error saving student:', err);
      throw err;
    });

    /*const filter = {email: student.email}

      const updateDoc = {
        $push: {
          registeredCourses: classObj.name
        }
      }
      
      const result = await userModel.updateOne(filter, updateDoc)
      console.log(result)*/
    
    //await Clss.findByIdAndUpdate(classId, { $addToSet: { students: studentId } }, { new: true });

    return {
      success: true,
      message: `The class "${classObj.name}" has been added to ${student.username.first}'s class list.`
    };
  } catch (error) {
    return {
      success: false,
      message: error.message,
    };
  }
}

/*router.post("/register", async(req, res) =>{

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

        const filter = {email: email}
  
        const updateDoc = {
          $push: {
            registeredCourses: course
          }
        }
        
        const result = await userModel.updateOne(filter, updateDoc)
        console.log("Got here")
        console.log(result)

        res.render(path.join(__dirname, '/../../views/pages/student-page.ejs'))
      }
      }
  })*/

module.exports = router;