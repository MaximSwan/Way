var express = require('express');
var router = express.Router();
const db = require('../db/db.js');

var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: false }))

router.use(bodyParser.json())

router.delete('/node/:id', async (req, res, next) => {
  try {

    let node = await db.Node.findOneAndDelete({ _id: req.params.id });
    if (!node.isType) {
      let childsNode = await db.Node.remove({ parentId: { $eq: node._id } });
    }

    res.send(node);
  } catch (err) {
    next(err);
  }

})

router.get('/node/:id/childs', async (req, res) => {
  let node = await db.Node.findOne({ _id: req.params.id });
  let childs = await db.Node.find({ parentId: { $eq: node._id } });
  res.send(childs);
})

router.get('/nodes', async (req, res) => {
  try {
    let nodes = await db.Node.find({});
    res.send(nodes);
  } catch (error) {
    next(error);
  }
})

router.post('/node', async (req, res) => {
  try {
    let node = new db.Node(req.body);
    let error = node.validateSync();

    if (error) {
      return next(error);
    }

    let result = await node.save();

    res.send(result);

  } catch (error) {
    next(error);
  }
})

router.put('/node', async (req, res) => {
  try {
    let node = await db.Node.findOne({ name: req.body[1].name });
    node.parentId = req.body[0]._id;
    let result = await node.save();
    res.send(result);
  } catch (error) {
    next(error);
  }
})

module.exports = router;
