var express = require('express');
var router = express.Router();
const db = require('../db/db.js');

var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }))

router.use(bodyParser.json())

router.get('/folder/childs/:name', async (req, res) => {
  let folder = await db.Folder.findOne({ name: req.params.name });
  let childs = await db.Folder.find({ parentName: { $eq: folder.name } });
  res.send(childs);
})

router.get('/folders', async (req, res) => {
  let folders = await db.Folder.find({});
  res.send(folders);
})

router.post('/folder/child', (req, res) => {
  let folder = new db.Folder();
  folder.name = req.body.name;
  folder.parentName = req.body.parentName;
  folder.save()
    .then(result => {
      res.send(folder)
    })
    .catch(err => {
      console.error(err);
    });
})

router.post('/folder', (req, res) => {
  let folder = new db.Folder();
  folder.name = req.body.name;
  folder.save()
    .then(result => {
      res.send(folder);
    })
    .catch(err => {
      console.error(err);
    });
})

router.post('/file', async (req, res) => {
  let file = new db.Folder(); 
  file.name = req.body.name;
  file.parentName = req.parent.name;
  file.isType = 'file';
  file.save()
    .then(result => {
      res.send(file)
    })
    .catch(err => {
      console.error(err);
    })
});

router.delete('/folder/:name', async (req, res) => {
  try {
    let folder = await db.Folder.deleteOne({ name: req.params.name });
    let folderDeleted = await db.Folder.remove({ parentName: req.params.name });
  } catch (err) {
    console.error(err);
  }
  res.send(folder);
})

router.delete('/file', async (req, res) => {
  try {
    let file = await db.Folder.deleteOne({ name: req.body.name, isType: 'file' });
  } catch (err) {
    console.error(err);
  }
  res.send(file);
})

router.put('/folder', async (req, res) => {
  let folder = await db.Folder.findOne({ name: req.body[1].name });
  folder.parentName = req.body[0].name;
  folder.save()
    .then(folder => {
      res.send(folder);
    })
})

module.exports = router;
