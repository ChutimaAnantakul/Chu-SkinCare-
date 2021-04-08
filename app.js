const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoConnect = require("./util/database").mongoConnect;
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const homeData = require("./routes/home");
const userData = require("./routes/user");
const adminData = require("./routes/admin");

app.use(bodyParser.json()); // application/json

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(homeData.routes);
app.use(adminData.routes);
app.use(userData.routes);


app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "Page Not Found" });
});

const port = process.env.PORT || 3000;

mongoConnect(() => {
  app.listen(port);
});
