const Datastore = require('nedb'),
      path = require('path'),
      obj = {}, db = {};

obj.init = () => {
  db.files = new Datastore({ filename: 'path/to/products', autoload: true });
}

obj.saveFile = (file, cb) => {
  db.files.insert(file, (err, newFile) => {
    if(err) cb(false);
    cb(newFile);
  });
}

obj.getFiles = cb => {
  db.files.find({}, (err, files) => {
    if(err) cb(false);
    cb(files);
  });
}

module.exports = obj;
