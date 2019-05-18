'use strict';

var express = require('express');
var cors = require('cors');
var multer = require('multer');
const path = require('path');
var upload = multer();
var hbs = require('express-handlebars').create({ defaultLayout: null });

var app = express();

app.use(cors());

// express-handlebars
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));

// routes
app.get('/', function(req, res) {
  res.render('index');
});

app.post('/upload', upload.single('uploadFile'), (req, res) => {
  if (!req.file) {
    res.json({ msg: 'Please upload a file' });
  } else {
    var output = {
      name: req.file.originalname,
      type: req.file.mimetype,
      size: req.file.size
    };
    res.status(200).json(output);
  }
});

app.listen(process.env.PORT || 3000, function() {
  console.log('Node.js listening ...');
});
