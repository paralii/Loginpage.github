var express = require('express');
var router = express.Router();
const nocache = require('nocache');

const credentials ={
    email:'review@gmail.com',
    password:'passed'
}

//login user
router.post('/login',(req,res)=>{
    if(req.body.email == credentials.email&&req.body.password == credentials.password){
        req.session.user = req.body.email;
        req.session.isLoggedIn = true;
        res.redirect('/route/homepage');
    }else{
        res.redirect('/?error=Invalid Username or Password');
    }
});

// home user
router.get('/homepage', nocache(), (req, res) => {
    if (req.session.isLoggedIn) {
      res.render("homepage", { user: req.session.user });
    } else {
      res.redirect('/?error=Unauthorized User');
    }
  });
  
  // Logout route
  router.get('/logout', nocache(), (req, res) => {
    if (req.session.user) {
      req.session.destroy((err) => {
        if (err) {
          console.log(err);
          res.redirect('/?error=Error logging out');
        } else {
          res.redirect('/?logout=true');
        }
      });
    } else {
      res.redirect('/');
    }
  });

//export this to server.js
module.exports = router;
