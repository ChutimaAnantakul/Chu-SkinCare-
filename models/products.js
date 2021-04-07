// const mongodb = require('mongodb');
// const getDb = require('../util/database').getDb;

// class Products {
//     constructor(product_id, product_name, image_path, detail, amount, price, category, id) {
//         this.product_id = product_id;
//         this.product_name = product_name; //this = {"product_name": val, "price": val, "_id": val}
//         this.image_path = image_path;
//         this.detail = detail;
//         this.amount = amount;
//         this.price = price;
//         this.category = category;
//         this._id = id;
//     }

//     save() {
//         const db = getDb();
//         let dbOp;
//         if (this._id) {
//             // Update the product db.product.updateOne({_id: ObjectId(..)}, {$set:{}});
//             dbOp = db
//                 .collection('products')
//                 .updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: this });
//         } else {
//             // Insert product db.product.insertOne({"key1":val1, "key2": val2})
//             dbOp = db.collection('products').insertOne(this);
//         }
//         return dbOp
//             .then(result => {
//                 console.log(result);
//             })
//             .catch(err => {
//                 console.log(err);
//             });
//     }

//     static fetchAll() {
//         const db = getDb();
//         return db
//             .collection('products') // db.products.find({})
//             .find()
//             .toArray()
//             .then(products => {
//                 console.log(products);
//                 return products;
//             })
//             .catch(err => {
//                 console.log(err);
//             });
//     }

//     static findById(prodId) {
//         const db = getDb();
//         return db
//             .collection('products') // db.products.find(_id: ObjectId('...'))
//             .find({ _id: new mongodb.ObjectId(prodId) })
//             .next()
//             .then(product => {
//                 console.log(product);
//                 return product;
//             })
//             .catch(err => {
//                 console.log(err);
//             });
//     }

//     static deleteById(prodId) {
//         const db = getDb();
//         return db
//             .collection('products') // db.products.deleteOne({_id: ObjectId('...')})
//             .deleteOne({ _id: new mongodb.ObjectId(prodId) })
//             .then(result => {
//                 console.log('Deleted');
//             })
//             .catch(err => {
//                 console.log(err);
//             });
//     }
// }

// module.exports = Products;




const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

class Products {
  constructor(
    product_name,
    category,
    price,
    amount,
    detail,
    image_path,
    id
  ) {
    this.product_name = product_name;
    this.category = category;
    this.price = price;
    this.amount = amount;
    this.detail = detail;
    this.image_path = image_path;
    this._id = id;
  }

  save() {
    const db = getDb();
    let dbOp;
    if (this._id) {
      // Update the product
      dbOp = db
        .collection("products")
        .updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: this });
    } else {
      // Insert product db,products.insertOne({"key1":val1,"key2":val2})
      dbOp = db.collection("products").insertOne(this);
      //   db.products.insertOne({"name":"abd"});
    }
    return dbOp
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // TEST
  updateCategories(oldName, newName) {
    const db = getDb();
    let dbOp;
    dbOp = db
      .collection("products")
      .updateMany({ category: oldName }, { $set: { category: newName } });
    return dbOp
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  // TEST

  static fetchAll() {
    const db = getDb();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((products) => {
        console.log(products);
        return products;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findByCategories(category) {
    const db = getDb();
    return db
      .collection("products")
      .find({ category: category })
      .toArray()
      .then((product) => {
        console.log(product);
        return product;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findById(prodId) {
    const db = getDb();
    return db
      .collection("products")
      .find({ _id: new mongodb.ObjectId(prodId) })
      .next()
      .then((product) => {
        console.log(product);
        return product;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findByName(prodName) {
    const db = getDb();
    return db
      .collection("products")
      .find({ product_name: prodName })
      .next()
      .then((product) => {
        console.log(product);
        return product;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static deleteById(prodId) {
    const db = getDb();
    return db
      .collection("products")
      .deleteOne({ _id: new mongodb.ObjectId(prodId) })
      .then((result) => {
        console.log("Deleted");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = Products;