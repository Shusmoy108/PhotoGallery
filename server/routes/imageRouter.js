const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Image = require("../models/image");
const Tag = require("../models/tags");
const multer = require("multer");
const fs = require("fs");
const dir = "./files";
const storage = multer.diskStorage({
  destination: "files",

  filename(req, file, cb) {
    let len;
    fs.readdir(dir, (err, files) => {
      console.log(files.length);
      len = files.length;
      cb(null, "biggo" + len + file.originalname);
    });
  }
});

const upload = multer({ storage });

router.post("/addtag", function(req, res) {
  var tag = new Tag();
  tag.tagName = req.body.tagName;
  console.log(req.body.tagName);
  tag.save(function(err) {
    if (err) return handleError(err);
    Tag.find({}, function(err, tags) {
      if (err) throw err;
      console.log(tags);
      return res.json({
        success: true,
        tags: tags
      });
    });
  });
});
router.post("/showtag", function(req, res) {
  Tag.find({}, function(err, tags) {
    if (err) throw err;
    console.log(tags);
    return res.json({
      success: true,
      tags: tags
    });
  });
});
router.post("/addimage", upload.single("file"), function(req, res) {
  console.log(req.file);
  //     var image = new Image();
  //     image.imageLink = "abs";
  //     image.title = req.body.title;
  //     image.location = req.body.location;
  //     image.tags = req.body.selectedTags;
  //     console.log(req.body.imageName);
  //       image.save(function(err) {
  //         if (err) return handleError(err);
  //         console.log("good");
  //   console.log(req);
  //   return res.json({
  //     success: true
  //   });
  //     });
});
router.post("/files", upload.single("file"), (req, res) => {
  //console.log(req);
  var image = new Image();
  let len;
  fs.readdir(dir, (err, files) => {
    console.log(files.length);
    len = files.length;
    image.imageLink = "biggo" + (len - 1) + req.file.originalname;
    image.title = req.body.imagetitle;
    image.location = req.body.location;
    image.tags = req.body.selectedtags;

    console.log(req.file.path);
    image.save(function(err) {
      if (err) return handleError(err);
      console.log("good");
      //console.log(req);
      return res.json({
        success: true
      });
    });
  });

  // send the data to our REST AP
});
router.get("/showimage", function(req, res) {
  Image.find({}, function(err, images) {
    if (err) throw err;
    //console.log(tags);
    return res.json({
      success: true,
      images: images
    });
  });
});
router.post("/deleteimage", function(req, res) {
  Image.remove({ imageLink: req.body.imagename }, function(err, images) {
    if (err) throw err;
    //console.log(tags);
    Image.find({}, function(err, images) {
      if (err) throw err;
      //console.log(tags);
      return res.json({
        success: true,
        images: images
      });
    });
  });
});
module.exports = router;
