var multer = require('multer'),
    fs = require('fs'),
    path = require('path'),
    db = require('./db.js'),
    storage = multer.diskStorage({
      destination: path.join(__dirname, '..', 'public', 'uploads'),
      filename: (req, file, cb) => {
        cb(null, file.fieldname + Date.now() / 1000 + '.wav');
      }
    }),
    upload = multer({
      storage: storage,
    }).any();

module.exports = router => {

  router.post('/upload', function(req, res, next){
    upload(req, res, (err) => {
      if(err) throw err;
      let time = getTime();
      req.files[0]['creationDate'] = time.day;
      req.files[0]['creationTime'] = time.time;
      req.files[0]['duration'] = req.body.duration;
      db.saveFile(req.files[0], (response) => {
        if(!response) throw err;
        console.log("success save to db");
      })
    })
  })

  router.route('/getfiles')
    .get((req,res) => {
      db.getFiles((response) => {
        res.json({success:true, data: response})
      })
    })
  return router;

}

function getTime() {
  var currentdate = new Date();
  var DAY = currentdate.getDate() + "/"
    + (currentdate.getMonth()+1)  + "/"
    + currentdate.getFullYear();
  var TIME = + currentdate.getHours() + ":"
    + currentdate.getMinutes() + ":"
    + currentdate.getSeconds();

    return {
      day: DAY,
      time: TIME
    }
}
