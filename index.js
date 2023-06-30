import express from 'express';
import cors from 'cors';
import multer from 'multer'
import 'dotenv/config'
import fs from 'fs'

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post("/api/fileanalyse", upload.single('upfile') ,(req, res)=>{
  console.log(req.file)
  res.json({
    name: req.file.originalname,
    type: req.file.mimetype,
    size: req.file.size
  })
  // remove file
  fs.unlink(req.file.path,(err)=>{
     if(err){
       console.log(err)
     }
   })
})

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
