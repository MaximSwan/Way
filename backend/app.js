var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var db = require('./db/dbFolder.js')
var indexRouter = require('./routes/index');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.get('/getAllFolders', async (req, res) => {
  let folders = await db.Folder.find({});
  res.send(folders);
})

app.post('/addNewFolder/:name/:parentName', (req, res) => {
  let folder = new db.Folder();
  folder.name = req.params.name;
  folder.parentName = req.params.parentName;
  folder.save()
    .then(result => {
      res.send(folder)
    })
    .catch(err => {
      console.error(err);
    });
})

app.post('/addNewFile/:fileName/:idParent', async (req, res) => {
  let file = new db.File();
  file.name = req.params.fileName;
  file.idParent = req.params.idParent;
  file.save().then(result => {
    res.send(file)
  } )  
});

app.delete('/deleteFolder/:id', (req, res) => {
  db.Folder.deleteOne({_id:req.params.id})
  .then(result => {
    res.send('Deleted');
  } )
} )

app.delete('/deleteFile/:id', (req, res) => {
   db.File.deleteOne({_id:req.params.id})
   .then(result => {
     res.send('deleted')
   } )
})


module.exports = app;
