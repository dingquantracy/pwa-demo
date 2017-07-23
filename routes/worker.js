var express = require('express');
var path = require('path');
var fs = require('fs');
var router = express.Router();


router.get('/', function(req, res, next) {
  
  fs.readFile(path.join(__dirname, '../sw.js'), 'utf-8', function(err, content){

    res.setHeader('Content-type', 'application/javascript');
    
    if(err) {
      res.send('console.log("An error occured in requesting sw.js")');
    }else{
      res.send(content);
    }
    
  })

});


module.exports = router;
