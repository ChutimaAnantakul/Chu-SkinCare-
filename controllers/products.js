
const { validationResult } = require("express-validator");

const mongodb = require("mongodb");
const Product = require("../models/products");
const Cart = require("../models/carts");
const Categories = require("../models/categories");
const ObjectId = mongodb.ObjectId;


//index
exports.indexView = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      Categories.fetchAll().then((category) => {
        Cart.fetchAll().then((carts) => {
            res.render("products/index", {
              pageTitle: "CHU skincare Products",
              products: products,
              category: category,
              product_cart: carts,
            });
          });
        });
    })
    .catch((err) => {
      console.log(err);
    });     
};

//cart
exports.cartUserView = (req, res, next) => {
  Cart.fetchAll()
  .then((data)=>{
    console.log(data)
    res.render("products/cartUser",{
      pageTitle: 'User Cart',
      product_cart:data,
      errorMessage:null,
    });
  })
  .catch((err) =>{console.log(err)});
 
};


//adminCreate
exports.adminCreate = (req, res, next) => {
  Cart.fetchAll()
    .then((carts) => {
      res.render("products/admincreateproduct.ejs", {
        pageTitle: "Create",
        product_cart: carts,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

//adminCreate
exports.postAddProduct = (req, res, next) => {
  const { image_path, product_name, category, amount, price, detail } = req.body;
  // const { filename } = req.file;
  // let path = "/images/" + filename;
  const errors = validationResult(req);

  const product = new Product(
    image_path,
    product_name,
    category,
    amount,
    price,
    detail,
    
  );
  product
    .save()
    .then((result) => {
      res.redirect("/adminproduct");
    })
    .catch((err) => {
      console.log(err);
    });
};

//AdmindeleteProduct
exports.deleteProduct = (req, res, next) => {
  const { product_id } = req.params;
  Product.deleteById(product_id)
    .then(() => {
      res.redirect("/adminproduct");
    })
    .catch((err) => console.log(err));
};

//deleteProductCart
exports.deleteProductCart = (req, res, next) => {
  const { name } = req.params;
  Cart.deleteByName(name)
    .then(() => {
      res.redirect("/userCart");
    })
    .catch((err) => console.log(err));
};

//adminProduct
exports.adminProduct = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      Cart.fetchAll().then((carts) => {
        res.render("products/adminproducts", {
          pageTitle: "admin product",
          products: products,
          product_cart: carts,
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

//category
exports.viewProductByCategories = (req, res, next) => {
  const { category } = req.params;
  Product.findByCategories(category)
    .then((products) => {
      Categories.fetchAll()
        .then((category) => {
          Cart.fetchAll().then((cart) => {
            res.render("products/index", {
              pageTitle: "Products",
              products: products,
              category: category,
              product_cart: cart,
            });
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

//adminEditProduct
exports.adminEdit = (req, res, next) => {
  const { product_id } = req.params;
  Product.findById(product_id)
    .then((product) => {
      Categories.fetchAll().then((categories) => {
        Cart.fetchAll().then((cart) => {
          product_name = product.product_name;
          price = product.price;
          category = product.category;
          res.render("products/edit", {
            pageTitle: "Edit",
            errorMessage: null,
            product_id: product_id,
            product_name: product_name,
            category: category,
            categories: categories,
            price: price,
            amount: product.amount,
            detail: product.detail,
            image_path: product.image_path,
            product_cart: cart,
          });
        });
      });
    })
    .catch((err) => console.log(err));
};

//productDetail
exports.productDetail = (req, res, next) => {
  const { product_id } = req.params;
  Product.findById(product_id)
    .then((product) => {
      Cart.fetchAll().then((cart) => {
        product_name = product.product_name;
        price = product.price;
        res.render("products/single", {
          pageTitle: "Product Detail",
          errorMessage: null,
          product_id: product_id,
          product_name: product_name,
          price: price,
          amount: product.amount,
          detail: product.detail,
          image_path: product.image_path,
          product_cart: cart,
        });
      });
    })
    .catch((err) => console.log(err));
};

//addToCart
exports.addToCart = (req, res, next) => {
  const { add_to_cart } = req.body;
  Product.findByName(add_to_cart).then((product) => {
    product_name = product.product_name;
    amount = product.amount;
    price = product.price;
    image_path = product.image_path;
    const cart = new Cart(product_name, amount, price, image_path);
    cart
      .save()
      .then((result) => {
        res.redirect("/");
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

//postUpdateProduct admin
exports.postUpdateProduct = (req, res, next) => {
  console.log(req.body);
  const { image_path, product_name, category, price, amount, detail, product_id } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      res.render('products/edit', {
          pageTitle: 'Update Product',
          errorMessage: errors.array(),
          image_path: image_path,
          product_name: product_name,
          category: category,
          amount: amount,
          price: price,
          detail: detail,
          product_id: product_id
      });
  }

  const product = new Product(image_path, product_name, category, amount, price, detail, new ObjectId(product_id));
  product
      .save()
      .then(result => {
          console.log('Update Product');
          res.redirect('/adminproduct');
      })
      .catch(err => console.log(err));
};



//--------------------------->  End Section