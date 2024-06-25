const productModel = require("../models/productModel");

const getAllProducts = async (req, res) => {
    const { category, sort, price_min, price_max } = req.query;
    let filter = {};
    let orderBy = {};

    if(category){
        filter.category = category;
    }
    if(price_min){
        filter.price = {...filter.price, gte: parseFloat(price_min)};
    }
    if(price_max){
        filter.price = {...filter.price, lte: parseFloat(price_max)}
    }

    if(sort){
        // default is asc if you want to change in postman its
                // products?sort=price=desc
        if (sort === "name") {
            orderBy = {name: sort === "desc" ? "desc" : "asc"};
        } else if (sort === "price") {
            orderBy = {price: sort === "desc" ? "desc" : "asc"};
        } 

    }

    try{
        const products = await productModel.getAllProducts(filter, orderBy);
        res.status(200).json(products);
    }catch(error){
        res.status(400).json({error: error.message});
    }
};

const getProductById = async (req, res) => {
    try{
        const product = await productModel.getProductById(req.params.id);
        if(product){
            res.status(200).json(product);
        }else{
            res.status(404).json({error: "Product not found"});
        }
    }catch (error){
        res.status(400).json({error: error.message});
    }
};


const createProduct = async (req, res) => {
    try {
      const newProduct = await productModel.createProduct(req.body);
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  const updateProduct = async (req, res) => {
    try {
      const updatedProduct = await productModel.updateProduct(req.params.id, req.body);
      if (updatedProduct) {
        res.status(200).json(updatedProduct);
      } else {
        res.status(404).json({ error: "Product not found" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  

  const deleteProduct = async (req, res) => {
    try {
      const deletedProduct = await productModel.deleteProduct(req.params.id);
      if (deletedProduct) {
        res.status(200).json(deletedProduct);
      } else {
        res.status(404).json({ error: "Product not found" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  

  module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
  };