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
  try {
    let folders = await db.Folder.find({});
    res.send(folders);
  } catch (error) {
    next(error);
  }
})

router.post('/folder/child', (req, res) => {
  try {
    let folder = new db.Folder();
    folder.name = req.body.name;

    let error = folder.validateSync();

    if (error) {
      return next(error);
    }

    folder.parentName = req.body.parentName;
    folder.save();

  } catch (error) {
    next(error);
  }
})

router.post('/folder', async (req, res) => {
  try {
    let folder = new db.Folder();
    folder.name = req.body.name;

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

router.delete('/folder/:name', async (req, res, next) => {
  try {
    let result = await Promise.all([db.Folder.deleteOne({ name: req.params.name }),
    db.Folder.remove({ parentName: req.params.name })])

    res.send(result[0]);

  } catch (err) {
    next(err);
  }

})

router.delete('/file', async (req, res) => {
  try {
    let file = await db.Folder.deleteOne({ name: req.body.name, isType: 'file' });
    res.send(file);
  } catch (error) {
    next(error);
  }
})

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
