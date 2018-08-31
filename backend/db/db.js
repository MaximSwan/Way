const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/Folders')
  .then(() => {
    console.log('Successful connection');
  })
  .catch(err => {
    console.error('Can t connect to db');
  })

const Node = mongoose.model('Folder', {
  name: {
    type: String,
    required: true,
  },
  parentId: String,
  isType: String,
})

module.exports = {
  Node: Node,
}