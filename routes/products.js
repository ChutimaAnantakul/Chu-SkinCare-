// const express = require('express');

// const { check } = require('express-validator')
// const router = express.Router();

// const productsController = require('../controllers/products');

// // /admin/add-product => GET
// router.get('/', productsController.getSearchProduct);

// router.get('/insert', productsController.getAddProduct);

// router.get('/update/:product_id', productsController.getUpdateProduct);

// // /admin/add-product => POST
// router.post('/insert', [
//     check('product_name').trim().not().isEmpty().withMessage("product name is required"),
//     check('price').isFloat({ gt: 0 }).withMessage("greater than zero")
// ], productsController.postAddProduct);

// router.post('/update', [
//     check('product_id').not().isEmpty().withMessage("empty"),
//     check('product_name').trim().isLength({ min: 1 }).withMessage("product name is required"),
//     check('price').isFloat({ gt: 0 }).withMessage("greater than zero")
// ], productsController.postUpdateProduct);

// router.get('/delete/:product_id', productsController.getDeleteProduct);

// exports.routes = router;







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

// /admin/add-product => GET
router.get("/", productsController.indexView);

router.get("/:category", productsController.viewProductByCategories);

router.get("/wishlist", productsController.showCart);

router.get("/single/:product_id", productsController.productDetail);




router.get("/showDetail", productsController.showDetail);

router.post("/addToCart", productsController.addToCart);

router.get("/deleteProductCart/:name", productsController.deleteProductCart);

router.get("/products", productsController.viewAllProduct);


router.get("/create", productsController.viewCreate);

router.post(
  "/create",
  [
    upload.single("image_path"),
    check("product_id").not().isEmpty().withMessage("empty"),
    check("product_name")
      .trim()
      .isLength({ min: 1 })
      .withMessage("product name is required"),
    check("category")
      .isLength({ min: 1 })
      .withMessage("categories is required"),
    check("price").isFloat({ gt: 0 }).withMessage("greater than zero"),
    check("amount")
      .isInt({ gt: -1 })
      .withMessage("greater than or equal to zero"),
    check("detail")
      .isLength({ min: 1 })
      .withMessage("description is required"),
  ],
  productsController.postAddProduct
);

router.get("/delete/:product_id", productsController.deleteProduct);

router.get("/stock", productsController.adminStock);

router.get("/editProduct/:product_id", productsController.adminEdit);


router.post(
  "/update",
  [
    upload.single("image_path"),
    check("product_id").not().isEmpty().withMessage("empty"),
    check("product_name")
      .trim()
      .isLength({ min: 1 })
      .withMessage("product name is required"),
    check("price").isFloat({ gt: 0 }).withMessage("greater than zero"),
    check("amount")
      .isInt({ gt: -1 })
      .withMessage("greater than or equal to zero"),
    check("detail")
      .isLength({ min: 1 })
      .withMessage("description is required"),
  ],
  productsController.postUpdateProduct
);

// End New Section

exports.routes = router;