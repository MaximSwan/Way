var express = require('express');
var router = express.Router();
const db = require('../db/db.js');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/folderRenameParent/:folderName/:newParentName', async (req, res) => {
  let folder = await db.Folder.findOne({ name: req.params.folderName });
  folder.parentName = req.params.newParentName;
  folder.save()
    .then(folder => {
      res.send(folder);
    })
})

router.get('/getChildFoldersOnName/:name', async (req, res) => {
  let folder = await db.Folder.findOne({ name: req.params.name });
  let childs = await db.Folder.find({ parentName: { $eq: folder.name } });
  res.send(childs);
})

router.get('/getAllFolders', async (req, res) => {
  let folders = await db.Folder.find({});
  res.send(folders);
})

router.post('/addNewFolder/:nameFolder/:parentName', (req, res) => {
  let folder = new db.Folder();
  folder.name = req.params.nameFolder;
  folder.parentName = req.params.parentName;
  folder.save()
    .then(result => {
      res.send(folder)
    })
    .catch(err => {
      console.error(err);
    });
})

router.post('/addNewFolderHight/:nameFolder/', (req, res) => {
  let folder = new db.Folder();
  folder.name = req.params.nameFolder;
  folder.save()
    .then(result => {
      res.send(folder);
    })
    .catch(err => {
      console.error(err);
    });
})

router.post('/addNewFile/:fileName/:parentName', async (req, res) => {
  let file = new db.Folder();
  file.name = req.params.fileName;
  file.parentName = req.params.parentName;
  file.isType = 'file';
  file.save()
    .then(result => {
      res.send(file)
    })
    .catch(err => {
      console.error(err);
    })
});

router.delete('/deleteFolder/:name', async (req, res) => {
  try {
    let folder = await db.Folder.deleteOne({ name: req.params.name });
    let folderDeleted = await db.Folder.remove({ parentName: req.params.name });
  } catch (err) {
    console.error(err);
  }
  res.send(folder);
})

router.delete('/deleteFile/:name', async (req, res) => {
  try {
    let file = await db.Folder.deleteOne({ name: req.params.name, isType: 'file' });
  } catch (err) {
    console.error(err);
  }
  res.send(file);
})

module.exports = router;
