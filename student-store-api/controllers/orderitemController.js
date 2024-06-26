const orderItemModel = require("../models/orderItemModel");

const getAllOrderItems = async (req, res) => {
    try{
        const orderItems = await orderItemModel.getAllOrderItems();
        res.status(200).json(orderItems);
    }catch(error){
        res.status(400).json({error: error.message});
    }
}

const getOrderItemsById = async (req, res) => {
    try{
        const orderItems = await orderItemModel.getOrderItemsById(req.params.id);
        if(orderItems){
            res.status(200).json(orderItems);
        }else{
            res.status(404).json({error: " Order Item not found"});
        }
    }catch (error){
        res.status(400).json({error: error.message});
    }
};


const createOrderItems = async (req, res) => {
    try {
      const orderItems = await orderItemModel.createOrderItems(req.body);
      res.status(201).json(orderItems);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  const updateOrderItems = async (req, res) => {
    try {
      const orderItems = await orderItemModel.updateOrderItems(req.params.id, req.body);
      if (orderItems) {
        res.status(200).json(orderItems);
      } else {
        res.status(404).json({ error: "Order Item not found" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  

  const deleteOrderItems = async (req, res) => {
    try {
      const orderItems = await orderItemModel.deleteOrderItems(req.params.id);
      if (orderItems) {
        res.status(200).json(orderItems);
      } else {
        res.status(404).json({ error: "Order Item not found" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };


module.exports = {
    getAllOrderItems,
    getOrderItemsById,
    createOrderItems,
    updateOrderItems,
    deleteOrderItems,
}