var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var db = require('./db/db.js')
var indexRouter = require('./routes/index');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  next();
});

app.use('/', indexRouter);

app.put('/updateCorFolder/:id', async (req, res) => {
  let folder = await db.Folder.findByIdAndUpdate(req.params.id);
  res.send(folder);
})

app.get('/getChildFolders/:id', async (req, res) => {
  let folder = await db.Folder.findOne({ _id: req.params.id });
  let childs = await db.Folder.find({ parentId: { $eq: folder._id } });
  res.send(childs);
})

app.get('/getAllFolders', async (req, res) => {
  let folders = await db.Folder.find({});
  res.send(folders);
})

app.post('/addNewFolder/:nameFolder/:parentId', (req, res) => {
  let folder = new db.Folder();
  folder.name = req.params.nameFolder;
  folder.parentId = req.params.parentId;
  folder.save()
    .then(result => {
      res.send(folder)
    })
    .catch(err => {
      console.error(err);
    });
})

app.post('/addNewFolderHight/:nameFolder/', (req, res) => {
  let folder = new db.Folder();
  folder.name = req.params.nameFolder;
  folder.save()
    .then(result => {
      res.send(folder)
    })
    .catch(err => {
      console.error(err);
    });
})

app.post('/addNewFile/:fileName/:idParent', async (req, res) => {
  let file = new db.Folder();
  file.name = req.params.fileName;
  file.parentId = req.params.idParent;
  file.isType = 'file';
  file.save()
    .then(result => {
      res.send(file)
    })
    .catch(err => {
      console.error(err);
    })
});

app.delete('/deleteFolder/:id', async (req, res) => {
  try {
    let folder = await db.Folder.deleteOne({ _id: req.params.id });
    db.Folder.remove({ parentId: req.params.id });
  } catch (err) {
    console.error(err);
  }
  res.send(folder);
})

app.delete('/deleteFile/:id', async (req, res) => {
  try {
    let file = await db.Folder.deleteOne({ _id: req.params.id });
  } catch (err) {
    console.error(err);
  }
  res.send(file);
})

module.exports = app;
