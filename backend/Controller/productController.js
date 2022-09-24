const expressAsyncHandler = require("express-async-handler");
const product = require("../Models/productModel");

const fetchProducts = expressAsyncHandler(async (req, res) => {
  const productExists = await product.find({});

  if (productExists) {
    res.send(productExists);

    // console.warn(productExists);
  } else {
    res.status(400);
    throw new Error("No Product currently available for sale");
  }
});

const registerProduct = expressAsyncHandler(async (req, res) => {
  const {
    productName,
    productCost,
    productDescription,
    productManufacturingYear,
    productStock,
    productNewOrOld,
    productDateOfPost,
    productImage,
  } = req.body;

  if (!productName || !productCost || !productStock) {
    res.status(400);
    throw new Error("Please Enter all fields");
  }

  const productExists = await product.findOne({ productName });

  if (productExists) {
    res.status(400);
    throw new Error("Product already exists with this name");
  }
  const Product = await product.create({
    productName,
    productCost,
    productDescription,
    productManufacturingYear,
    productStock,
    productNewOrOld,
    productDateOfPost,
    productImage,
  });

  if (Product) {
    res.status(201).json({
      name: Product.productName,
      cost: Product.productCost,
      desc: Product.productDescription,
      manufac: Product.productManufacturingYear,
      stock: Product.productStock,
      neworold: Product.productNewOrOld,
      datepost: Product.productDateOfPost,
      image: Product.productImage,
    });
  } else {
    res.status(400);
    throw new Error("Product not found");
  }
});

module.exports = { fetchProducts, registerProduct };
