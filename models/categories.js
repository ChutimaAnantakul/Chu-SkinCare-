const mongodb = require("mongodb");
const getDb = require("../util/database").getDb;

class Categories {
  constructor(category, id) {
    this.category = category;
    this._id = id;
  }

  save() {
    const db = getDb();
    let dbOp;
    if (this._id) {
      // Update the product
      dbOp = db
        .collection("category")
        .updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: this });
    } else {
      // Insert product db,products.insertOne({"key1":val1,"key2":val2})
      dbOp = db.collection("category").insertOne(this);
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

  uplate(newName) {
    const db = getDb();
    let dbOp;
    dbOp = db
      .collection("category")
      .updateOne(
        { category: this.category },
        { $set: { category: newName } }
      );

    return dbOp
      .then((result) => {
        console.log(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static fetchAll() {
    const db = getDb();
    return db
      .collection("category")
      .find()
      .toArray()
      .then((category) => {
        console.log(category);
        return category;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static findById(cateId) {
    const db = getDb();
    return db
      .collection("category")
      .find({ _id: new mongodb.ObjectId(cateId) })
      .next()
      .then((category) => {
        console.log(category);
        return category;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static deleteById(cateId) {
    const db = getDb();
    return db
      .collection("category")
      .deleteOne({ _id: new mongodb.ObjectId(cateId) })
      .then((result) => {
        console.log("Deleted");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static deleteByName(cateName) {
    const db = getDb();
    return db
      .collection("category")
      .deleteOne({ category: cateName })
      .then((result) => {
        console.log("Deleted");
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = Categories;