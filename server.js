// const express = require('express');
// const multer = require('multer');
// const AWS = require('aws-sdk');
// const path = require('path');
// const cors=require("cors");
// // Initialize AWS S3
// const s3 = new AWS.S3({
//   accessKeyId: 'AKIAQ4NSA4NTAYXX3NHO', // Replace with your AWS access key
//   secretAccessKey: 'RWlb8rufnxxq3/PU4KCqUJ6rE8w+deTcJy23jFEV', // Replace with your AWS secret key
//   region: 'eu-north-1' // Replace with your S3 bucket region
// });

// // Initialize Express and configure multer for file handling
// const app = express();
// app.use(cors());
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// const BUCKET_NAME = 'npmpackagebucket'; // Replace with your S3 bucket name

// // Route to handle file upload
// app.post('/upload', upload.single('image'), (req, res) => {
//     const file = req.file;
//     const fileName = Date.now() + path.extname(file.originalname); // Unique file name
  
//     if (!file) return res.status(400).send("No file uploaded");
  
//     // const params = {
//     //   Bucket: BUCKET_NAME,
//     //   Key: fileName,
//     //   Body: file.buffer, // 🔥 Use buffer instead of fs.createReadStream
//     //   ContentType: file.mimetype,
//     // };
//     const params={
//       Bucket:BUCKET_NAME,
//       Key:fileName,
//       Body:file.buffer,
//       ContentType:file.mimetype
//     }
  
//     s3.upload(params, (err, data) => {
//       if (err) {
//         console.log("S3 Upload Error:", err);
//         return res.status(500).json({ message: 'Error uploading file', error: err });
//       }
//       console.log(data.Location)
//       res.status(200).json({ message: 'File uploaded successfully', url: data.Location });
//     });
//   });
  

// Start the server
const express=require("express");
const app=express();
const multer=require("multer");
const storage=multer.memoryStorage();
const upload=multer({storage});
const AWS=require('aws-sdk')
const s3=new AWS.S3({
  accessKeyId:"AKIAQ4NSA4NTAYXX3NHO",
  secretAccessKey:"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",
  region:"eu-north-1"
})
app.post("/setimage",upload.single('file'),(req,res)=>{
if(!req.file){
  return res.status(400).json({ message: "No file uploaded" });

}
const filename=req.file.originalname+Date.now();
console.log(req.file);
const params = {
  Bucket: "npmpackagebucket",
  Key: filename,
  Body: req.file.buffer,
  ContentType: req.file.mimetype,
};
s3.upload(params,(err,data)=>{
  if(err){
    console.log("some error",err);
  }
  if(!err){
    console.log(data)
  }
 
})
})
const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
