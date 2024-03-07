const productModel = require('../models/ProductModel');

const ProductController = {
  getAllProduct: async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
      let products;

      if (qNew) {
        products = await productModel.find().sort({ createdAt: -1 }).limit(1);
      } else if (qCategory) {
        products = await productModel.find({
          categories: {
            $in: [qCategory],
          },
        });
      } else {
        products = await productModel.find();
      }

      res.status(200).json(products);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  createProduct:async(req,res)=>{
    const newProduct = new productModel(req.body);
    try {
      const product = await newProduct.save();
      res.status(201).json(product);
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

module.exports = ProductController;