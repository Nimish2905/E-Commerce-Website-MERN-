//Product Name
//Product Cost
//Product Description
//Product Manufacturing Date/Year
//Product Stock
//Product New/Old
//Product Date of Posting
//Product Image

const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  productName: { type: String },
  productCost: { type: Number },
  productDescription: { type: String },
  productManufacturingYear: { type: Number },
  productStock: { type: Number },
  productNewOrOld: { type: String },
  productDateOfPost: { type: String },
  productImage: {
    type: String,
    default:
      "http://www.atozmyshop.com/content/images/thumbs/default-image_450.png",
  },
});

const product = mongoose.model("product", productSchema);
module.exports = product;
