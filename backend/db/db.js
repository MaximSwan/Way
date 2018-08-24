const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/Folders')
  .then(() => {
    console.log('Successful connection');
  })
  .catch(err => {
    console.error('Can t connect to db');
  })

const Folder = mongoose.model('Folder', {
  name: String,
  parentId:String,
  isType:String,
})

module.exports = {
  Folder: Folder,
}