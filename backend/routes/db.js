const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/folders').then(() => {
    console.log('Successful connection');
})
.catch(err => {
   console.error(err);
})

const Folder = mongoose.model('Folder', {
    name:String,
    folderChild:[]
})

module.exports = {
    Folder: Folder
}

