var express = require('express');
var router = express.Router();



router.get('/', function(req,res,err) {
    res.render('passwordReset',{
      errorMessage:''
    });
});

router.post('/', function(req, res, err) {
  if (req.body.resetEmail) {
      if (!req.body.resetEmail.includes('@') || !req.body.resetEmail.includes('.com')){
          var errorMessage = 'This is not an email';
          console.log('executed');
          res.render('passwordReset', {
              errorMessage:errorMessage
          });
      }
  }else {
      var errorMessage = 'Please enter your email address';
      console.log('executed');
      res.render('passwordReset', {
          errorMessage:errorMessage
      });
  }
});


module.exports = router;
