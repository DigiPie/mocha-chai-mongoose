"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var productSchema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, default: 0 },
    isListed: { type: Boolean, default: false },
    dateCreated: { type: Date, rqeuired: true },
    dateUpdated: { type: Date, required: true }
});
mongoose.model("products", productSchema);
