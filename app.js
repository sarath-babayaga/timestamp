require("dotenv").config();
const express = require("express");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const path = require("path");

const app = express();

const { PORT } = process.env;

app.use(fileUpload());

app.post("/upload", function (req, res) {
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }
  sampleFile = req.files.sampleFile;
  let name = Date.now();
  uploadPath = __dirname + `/public/files/${name}.txt`;
  sampleFile.mv(uploadPath, function (err) {
    if (err) return res.status(500).send(err);

    res.send("File uploaded!");
  });
});

app.get("/file-read", (req, res) => {
  fs.readdir(__dirname + "/public/files", (err, dir) => {
    let readAllFiles = []
    dir.forEach((ele) => {
      const file = fs.createWriteStream(ele);
      readAllFiles.push(file)
    });
    res.send({
      readAllFiles,
    });
  });


});
app.listen(PORT, () => {
  console.log(`this is port is runing on ${PORT}`);
});
