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

const categoriesController = require("../controllers/categories");

router.get("/adminproduct", productsController.adminProduct);

router.get("/create", productsController.adminCreate);

router.post(
  "/create",
  [
    upload.single("image_path"),
    check("product_id").not().isEmpty().withMessage("empty"),
    check('image_path').trim().isLength({ min: 1 }).withMessage("image name is required"),
    check("product_name")
      .trim()
      .isLength({ min: 1 })
      .withMessage("product name is required"),
    check("category")
      .isLength({ min: 1 })
      .withMessage("categories is required"),
    check("amount").isInt({ gt: -1 }).withMessage("greater than or equal to zero"),
    check("price").isFloat({ gt: 0 }).withMessage("greater than zero"),
    check("detail")
      .isLength({ min: 1 })
      .withMessage("description is required"),
  ],
  productsController.postAddProduct
);

router.get("/delete/:product_id", productsController.deleteProduct);


router.get("/editProduct/:product_id", productsController.adminEdit);

router.post('/update', [
  check('product_id').not().isEmpty().withMessage("empty"),
  check('image_path').trim().isLength({ min: 1 }).withMessage("image name is required"),
  check('product_name').trim().isLength({ min: 1 }).withMessage("product name is required"),
  check("category").isLength({ min: 1 }).withMessage("category is required"),
  check("amount").isInt({ gt: -1 }).withMessage("greater than or equal to zero"),
  check('price').isFloat({ gt: 0 }).withMessage("greater than zero"),
  check("detail")
      .isLength({ min: 1 })
      .withMessage("description is required"),
], productsController.postUpdateProduct);



router.get("/", categoriesController.indexView);

router.post("/add_categories", categoriesController.addCategories);

router.post("/update_categories", categoriesController.updateCategories);

router.get("/delete_categories/:name", categoriesController.deleteCategories);

exports.routes = router;



