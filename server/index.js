const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const keys = require("./config/keys");

require("./models/Product");
// Remember to config mongoURI in 'keys.js'
mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

const app = express();

app.use(bodyParser.json());

require("./routes/productRoutes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);

module.exports = app; // For mocha testing
