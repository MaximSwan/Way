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

app.get('/getChildFolders/:id', async (req, res) => {
  let folder = await db.Folder.findOne({ _id: req.params.id }); 
  let childs = await db.Folder.find({ parentId: { $eq: folder._id } });
  if (childs == null) {
    return res.send('Not found');
  }
  res.send(childs);
})

app.get('/getAllFolders', async (req, res) => {
  let folders = await db.Folder.find({});
  res.send(folders);
})

// app.post('/addNewFolder', (req, res) => {
//   let folder = new db.Folder();
//   folder.name = req.body.name;
//   folder.parentId = req.body.parentId;
//   folder.save()
//     .then(result => {
//       res.send(folder)
//     })
//     .catch(err => {
//       console.error(err);
//     });
// })

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
  let file = new db.File();
  file.name = req.params.fileName;
  file.idParent = req.params.idParent;
  file.save()
    .then(result => {
      res.send(file)
    })
    .catch(err => {
      console.error(err);
    })
});

app.delete('/deleteFolder/:id', (req, res) => {
  db.Folder.deleteOne({ _id: req.params.id })
    .then(result => {
      res.send('Deleted');
    })
    .catch(err => {
      console.error(err);
    })
})

app.delete('/deleteFile/:id', (req, res) => {
  db.File.deleteOne({ _id: req.params.id })
    .then(result => {
      res.send('deleted')
    })
    .catch(err => {
      console.error(err);
    })
})


module.exports = app;
