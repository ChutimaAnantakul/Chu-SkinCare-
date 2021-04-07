const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = callback => {
    // MongoClient.connect('mongodb://admin:password@localhost:27017/db', function (err, db)
    MongoClient.connect("mongodb+srv://chutima:010997@cluster0.pqriq.mongodb.net/skincare")
        .then(client => {
            console.log('Connected!');
            _db = client.db();
            callback();
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
}

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'No database found!';
};

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;


// const mongodb = require("mongodb");
// const MongoClient = mongodb.MongoClient;

// let _db;

// const mongoConnect = (callback) => {
//   // MongoClient.connect("mongodb://localhost:27017/shop")
//   MongoClient.connect(
//     "mongodb+srv://chutima:010997@cluster0.pqriq.mongodb.net/skincare"
//   )
//     .then((client) => {
//       console.log("Connected!");
//       _db = client.db();
//       callback();
//     })
//     .catch((err) => {
//       console.log(err);
//       throw err;
//     });
// };

// const getDb = () => {
//   if (_db) {
//     return _db;
//   }
//   throw "No database found!";
// };

// exports.mongoConnect = mongoConnect;
// exports.getDb = getDb;