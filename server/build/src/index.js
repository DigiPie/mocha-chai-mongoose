var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var keys = require("./config/keys");
var chalk = require("chalk");
require("./models/Product");
// Remember to config mongoURI in 'keys.js'
mongoose.connect(keys.mongoURI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
});
var app = express();
app.use(bodyParser.json());
require("./routes/productRoutes")(app);
var PORT = process.env.PORT || 5000;
app.listen(PORT);
var ROOT_URL = process.env.ROOT_URL || "http://localhost";
console.log("Listening on: " + chalk.green(ROOT_URL + ":" + PORT));
module.exports = app; // For mocha testing
