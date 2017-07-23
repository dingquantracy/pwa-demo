var express = require('express');
var path = require('path');
var fs = require('fs');
var marked = require('marked');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* 获取文章接口 */
router.get('/post', function(req, res, next) {

  var file = path.join(__dirname, '../posts/', req.query.no + '.md')

  fs.readFile(file, 'utf-8', function(err, content){
    
    if(err) {
      // res.send({content: '文章获取失败'})
      res.status(404).send('Sorry, we cannot find that!');
    }
    var content = marked(fs.readFileSync(file, 'utf-8'))
    res.send({content: content})
  })

});

router.get('/manifest.json', function(req, res, next) {
  fs.readFile(path.join(__dirname, '../manifest.json'), 'utf-8', function(err, content){

    res.setHeader('Content-type', 'application/json');
    res.send(content);
    
  })

});

module.exports = router;
