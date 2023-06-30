import express,{Request, Response} from 'express';
import cors from 'cors';
import multer from 'multer'
import 'dotenv/config'
import fs from 'fs'

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req: Request, res: Response) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post("/api/fileanalyse", upload.single('upfile') ,(req: Request, res: Response)=>{
  console.log(req.file)
  const file = req.file
  if(file != undefined){
    res.json({
      name: file.originalname,
      type: file.mimetype,
      size: file.size
    })
    // remove file
    fs.unlink(file.path,(err)=>{
       if(err){
         console.log(err)
       }
    })
    return
  }
  res.json({"error": "file not exits"})
})

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
