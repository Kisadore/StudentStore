const orderModel = require("../models/orderModel");

const getAllOrders = async (req, res) => {
    try{
        const order = await orderModel.getAllOrders();
        res.status(200).json(order)
    }catch (error){
        res.status(400).json({error: error.message})
    }
}

const getOrderById = async (req, res) => {
    try{
        const order = await orderModel.getOrderById(req.params.order_id);
        if(order){
            res.status(200).json(order);
        } else{
            res.status(400).json("Order not found")
        }
    } catch (error){
        res.status(400).json({error: error.message});
    }
};

const createOrder = async (req, res) => {
    try{
        const newOrder = await orderModel.createOrder(req.body);
        res.status(201).json(newOrder);
    } catch (error){
       res.status(400).json({error: error.message});
    }
};

const updateOrder = async (req, res) => {
    try {
        const updatedOrder = await orderModel.updateOrder(req.params.order_id, req.body);
        if (updatedOrder) {
          res.status(200).json(updatedOrder);
        } else {
          res.status(404).json({ error: "Order not found" });
        }
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
};

const deleteOrder = async (req, res) => {
    try {
      const deletedOrder = await orderModel.deleteOrder(req.params.order_id);
      if (deletedOrder) {
        res.status(200).json(deletedOrder);
      } else {
        res.status(404).json({ error: "Order not found" });
      }
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
};

// const AddItemToExistingOrder = async (req, res) => {
//   try {
//     const addedItem = await orderModel.AddItemToExistingOrder(req.params.order_id, req.body);
//     res.status(201).json(addedItem);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };
const addItemToExistingOrder = async (req, res) => {
  try {
      const order = await orderModel.getOrderById(req.params.order_id);
      if (!order) {
          return res.status(404).json({ error: "Order not found" });
      }

      const product = await prisma.product.findUnique({
          where: { id: req.body.product_id }
      });

      if (!product) {
          return res.status(404).json({ error: "Product not found" });
      }

      const addedItem = await orderModel.addItemToExistingOrder(req.params.order_id, req.body);
      res.status(201).json(addedItem);
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};


const calculateOrderTotal = async (req, res) => {
  try {
      const total = await orderModel.calculateOrderTotal(req.params.order_id);
      res.status(200).json({ total });
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};

module.exports = {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
    addItemToExistingOrder,
    calculateOrderTotal
  };