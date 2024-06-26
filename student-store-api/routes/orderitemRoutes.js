const express = require("express");
const router = express.Router();
const orderitemController = require("../controllers/orderitemController");

router.get("/", orderitemController.getAllOrderItems);
router.get("/:id", orderitemController.getOrderItemsById);
router.post("/", orderitemController.createOrderItems);
router.put("/:id", orderitemController.updateOrderItems);
router.delete("/:id", orderitemController.deleteOrderItems);

module.exports = router;