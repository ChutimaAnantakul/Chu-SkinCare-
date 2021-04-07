// const { validationResult } = require('express-validator')

// const mongodb = require('mongodb');
// const Product = require('../models/products');
// const ObjectId = mongodb.ObjectId;



// exports.getSearchProduct = (req, res, next) => {

//     Product.fetchAll()
//         .then(products => {
//             res.render('products/search', {
//                 pageTitle: 'Search Product',
//                 prods: products,
//             });
//         })
//         .catch(err => {
//             console.log(err);
//         });
// }

// exports.getAddProduct = (req, res, next) => {
//     const product_name = '';
//     const price = '';
//     res.render('products/insert', {
//         pageTitle: 'Insert Product',
//         errorMessage: null,
//         product_name: product_name,
//         price: price
//     });
// };

// exports.postAddProduct = (req, res, next) => {
//     console.log(req.body);
//     const { product_name, price } = req.body;
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         res.render('products/insert', {
//             pageTitle: 'Insert Product',
//             errorMessage: errors.array(),
//             product_name: product_name,
//             price: price
//         });
//     }

//     const product = new Product(product_name, price);
//     product
//         .save()
//         .then(result => {
//             // console.log(result);
//             console.log('Created Product');
//             res.redirect('/products');
//         })
//         .catch(err => {
//             console.log(err);
//         });

// };

// exports.getUpdateProduct = (req, res, next) => {
//     console.log(req.params);
//     const { product_id } = req.params;
//     let product_name = '';
//     let price = '';

//     Product.findById(product_id)
//         .then(product => {
//             console.log(product);
//             product_name = product.product_name;
//             price = product.price;
//             res.render('products/update', {
//                 pageTitle: 'Update Product',
//                 errorMessage: null,
//                 product_id: product_id,
//                 product_name: product_name,
//                 price: price
//             });
//         })
//         .catch(err => console.log(err));
// };

// exports.postUpdateProduct = (req, res, next) => {
//     console.log(req.body);
//     const { product_id, product_name, price } = req.body;
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//         res.render('products/update', {
//             pageTitle: 'Update Product',
//             errorMessage: errors.array(),
//             product_id: product_id,
//             product_name: product_name,
//             price: price
//         });
//     }

//     const product = new Product(product_name, price, new ObjectId(product_id));
//     product
//         .save()
//         .then(result => {
//             console.log('Update Product');
//             res.redirect('/products');
//         })
//         .catch(err => console.log(err));
// };

// exports.getDeleteProduct = (req, res, next) => {
//     const { product_id } = req.params;
//     console.log(product_id);
//     Product.deleteById(product_id)
//         .then(() => {
//             console.log('Delete Product');
//             res.redirect('/products');
//         })
//         .catch(err => console.log(err));
// };




const { validationResult } = require("express-validator");

const mongodb = require("mongodb");
const Product = require("../models/products");
const Cart = require("../models/carts");
const Categories = require("../models/categories");
const ObjectId = mongodb.ObjectId;




// exports.viewAllProduct = (req, res, next) => {
//   Product.fetchAll()
//     .then((products) => {
//       Categories.fetchAll().then((categories) => {
//         Cart.fetchAll().then((cart) => {
//           res.render("products/all_products", {
//             pageTitle: "Products",
//             products: products,
//             categories: categories,
//             product_cart: cart,
//           });
//         });
//       });
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };
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

exports.showCart = (req, res, next) => {
  Cart.fetchAll()
    .then((carts) => {
      res.render("products/wishlist", {
        pageTitle: "Cart",
        product_cart: carts,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.showDetail = (req, res, next) => {
  Cart.fetchAll()
    .then((carts) => {
      res.render("products/single", {
        pageTitle: "Detail",
        product_cart: carts,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.viewCreate = (req, res, next) => {
  Cart.fetchAll()
    .then((carts) => {
      res.render("products/create_product", {
        pageTitle: "Create",
        product_cart: carts,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postAddProduct = (req, res, next) => {
  const { product_name, category, price, amount, detail } = req.body;
  const { filename } = req.file;
  let path = "/images/" + filename;
  const errors = validationResult(req);

  const product = new Product(
    product_name,
    category,
    price,
    amount,
    detail,
    path
  );
  product
    .save()
    .then((result) => {
      res.redirect("/stock");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.deleteProduct = (req, res, next) => {
  const { product_id } = req.params;
  Product.deleteById(product_id)
    .then(() => {
      res.redirect("/stock");
    })
    .catch((err) => console.log(err));
};

exports.deleteProductCart = (req, res, next) => {
  const { name } = req.params;
  Cart.deleteByName(name)
    .then(() => {
      res.redirect("/wishlist");
    })
    .catch((err) => console.log(err));
};

exports.adminStock = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      Cart.fetchAll().then((carts) => {
        res.render("products/admin_stock", {
          pageTitle: "Stock",
          products: products,
          product_cart: carts,
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.viewAllProduct = (req, res, next) => {
  Product.fetchAll()
    .then((products) => {
      Categories.fetchAll().then((category) => {
        Cart.fetchAll().then((cart) => {
          res.render("products/offer", {
            pageTitle: "Products",
            products: products,
            category: category,
            product_cart: cart,
          });
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

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

exports.adminEdit = (req, res, next) => {
  const { product_id } = req.params;
  Product.findById(product_id)
    .then((product) => {
      Categories.fetchAll().then((category) => {
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
            path: product.path,
            product_cart: cart,
          });
        });
      });
    })
    .catch((err) => console.log(err));
};

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
          path: product.path,
          product_cart: cart,
        });
      });
    })
    .catch((err) => console.log(err));
};

exports.addToCart = (req, res, next) => {
  const { add_to_cart, amount } = req.body;
  Product.findByName(add_to_cart).then((product) => {
    product_name = product.product_name;
    price = product.price;
    path = product.path;
    const cart = new Cart(product_name, price, amount, path);
    cart
      .save()
      .then((result) => {
        res.redirect("/products");
      })
      .catch((err) => {
        console.log(err);
      });
  });
};

exports.postUpdateProduct = (req, res, next) => {
  const {
    product_id,
    product_name,
    price,
    amount,
    detail,
    category,
  } = req.body;
  const { filename } = req.file;
  let path = "/images/" + filename;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.render("products/edit", {
      pageTitle: "Edit",
      errorMessage: errors.array(),
      product_id: product_id,
      product_name: product_name,
      price: price,
      amount: amount,
      detail: detail,
    });
  }

  const product = new Product(
    product_name,
    category,
    price,
    amount,
    detail,
    path,
    new ObjectId(product_id)
  );
  product
    .save()
    .then((result) => {
      console.log("Update Product");
      res.redirect("/stock");
    })
    .catch((err) => console.log(err));
};

exports.productUpdateCategories = (req, res, next) => {
  const { category } = req.body;
  const errors = validationResult(req);

  const product = new Product("update", category);
  product
    .save()
    .then((result) => {
      console.log("Update Product");
      res.redirect("/stock");
    })
    .catch((err) => console.log(err));
};

//--------------------------->  End Section