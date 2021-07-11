const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();

app.use(express.urlencoded({
    extended: true
}));
app.set('views', './seeds');
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

app.get('/home', (req, res) => {
    return res.render('home.html');
});

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './storage');
    },
    filename: (req, files, cb) => {
      console.log('FILES Multer ==>> ', files);
      fileName = Date.now() + '-' + files.originalname;
      cb(null, fileName);
    }
  });

const upload = multer({
    storage: fileStorageEngine,
    limits: {
        fileSize: 1048576   // 1024 bytes * 1024 1 MB
    },
    fileFilter(req, files, cb){
        if(!files.originalname.match(/\.(jpg|jpeg|png)$/)){
            console.log('here...');
            return cb(new Error('Please select an Image file!'));
        }
        cb(null, true);
    },
});

app.post('/upload', upload.single('image'), (req, res) => {
    
}, (error, req, res, next) => {
    if(error){
        console.log(error.message);
        return res.status(400).json({
            error: error.message
        });
    }
    return res.status(200);
});

app.listen(8000, () => {
    console.log('Listening on PORT => 8000');
});