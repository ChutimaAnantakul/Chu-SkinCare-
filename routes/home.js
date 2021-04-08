const express = require("express");
const { check } = require("express-validator");
const router = express.Router();

var multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/NodeJS_learn/mini_project_specail/public/images");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
var upload = multer({ storage: storage });

const productsController = require("../controllers/products");

router.get("/", productsController.indexView);

exports.routes = router;