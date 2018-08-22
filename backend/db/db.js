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
  childs: []
})

const File = mongoose.model('File', {
  name:String,
  idParent:String
})

module.exports = {
  Folder: Folder,
  File: File,
}