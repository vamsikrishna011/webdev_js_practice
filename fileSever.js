const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.get('/files', (req,res) => {

  fs.readdir(path.join(__dirname,'/files'), (err, files) =>{
    if (err){
      res.send("Can't find the directory: " , err);
    }  
    res.status(200).json(files);
  })
})

app.get('/file/:filename', (req,res) =>{
  const {fileName} = req.params.filename;
  fs.readFile(path.join(__dirname, '/files/', fileName), (err,data) => {
    if (err){
      res.status(404).send("File not found");
    }
    res.status(200).send(data.toString());
  })
})

app.all('*', (req,res) =>{
  res.status(404).send("Route not found");
})

app.listen(port, function started() {
  console.log(`Example app listening on port ${port}`);
})