export {};

const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, default: 0 },
  isListed: { type: Boolean, default: false },
  dateCreated: { type: Date, rqeuired: true },
  dateUpdated: { type: Date, required: true }
});

mongoose.model("products", productSchema);
