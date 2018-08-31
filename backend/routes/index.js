var express = require('express');
var router = express.Router();
const db = require('../db/db.js');

var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }))

router.use(bodyParser.json())

router.put('/folders', async (req, res) => {

  let folder = new Folder();


})

router.delete('/folder/:id', async (req, res, next) => {
  try {
    let folder = await db.Folder.findOneAndDelete({ _id: req.params.id });
    let childsFolder = await db.Folder.remove({ parentName: { $eq: folder.name } });
    let childsFile = await db.Folder.remove({ parentName: { $eq: folder.name }, isType: 'file' });
    // let result = Promise.all([db.Folder.deleteOne({ _id: req.params.id }),
    // db.Folder.remove({ parentName: { $eq: result[0].name } }),
    // db.Folder.remove({ parentName: { $eq: result[0].name }, isType: 'file' }),
    // ])

    res.send(folder);
  } catch (err) {
    next(err);
  }

})

router.delete('/file/:id', async (req, res) => {
  try {
    let file = await db.Folder.deleteOne({ _id: req.params.id, isType: 'file' });
    res.send(file);
  } catch (error) {
    next(error);
  }
})

router.get('/folder/childs/:id', async (req, res) => {
  let folder = await db.Folder.findOne({ _id: req.params.id });
  let childs = await db.Folder.find({ parentName: { $eq: folder.name } });
  res.send(childs);
})

router.get('/folders', async (req, res) => {
  try {
    let folders = await db.Folder.find({});
    res.send(folders);
  } catch (error) {
    next(error);
  }
})

router.post('/folder', async (req, res) => {
  try {
    let folder = new db.Folder();
    folder.name = req.body.name;

    if (req.body.parentName) {
      folder.parentName = req.body.parentName;
    }

    let error = folder.validateSync();

    if (error) {
      return next(error);
    }

    let result = await folder.save();

    res.send(result);

  } catch (error) {
    next(error);
  }
})

router.post('/file', async (req, res, next) => {
  try {
    let file = new db.Folder();
    file.name = req.body.name;

    file.parentName = req.body.parentName;
    file.isType = 'file';

    let error = file.validateSync();

    if (error) {
      return next(error);
    }

    let result = await file.save();

    res.send(result);

  } catch (error) {
    next(error);
  }
});

router.put('/folder', async (req, res) => {
  try {
    let folder = await db.Folder.findOne({ name: req.body[1].name });
    folder.parentName = req.body[0].name;
    let result = await folder.save();
    res.send(result);
  } catch (error) {
    next(error);
  }
})

module.exports = router;
