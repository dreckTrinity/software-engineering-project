//This File containss a simple cookie handler that we use to store simple values and use elswhere in our program
//It's almost entirely based off of this w3schools page: https://www.w3schools.com/js/js_cookies.asp
//THIS FILE IS DEPRECATED AND CURRENTLY HAS NO USE, DO NOT CALL ANY FUNCTION FROM THIS FILE
//BY DEPRICATED I MEAN IT IS BROKEN, LIKE REALLY JUST DOESN'T WORK

function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    console.log("Cookie Saved!")
  }
  
function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
  
function checkCookie(cname) {
    let data = getCookie(cname);
    if (user != "") {
      alert("Welcome again " + user);
    } 
  }


  //This allows us to export these three functions to our other files
  //IF YOU ADD FUNCTIONS TO THIS FILE MAKE SURE TO EXPORT HERE IF ITS FOR USE IN OTHER FILES
  module.exports = {
    setCookie,
    getCookie,
    checkCookie
  }