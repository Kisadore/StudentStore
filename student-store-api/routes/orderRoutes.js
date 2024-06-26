const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.get("/", orderController.getAllOrders);
router.get("/:order_id", orderController.getOrderById);

router.post("/:order_id/items", orderController.addItemToExistingOrder);
router.get("/:order_id/total", orderController.calculateOrderTotal);

router.post("/", orderController.createOrder);
router.put("/:order_id", orderController.updateOrder);
router.delete("/:order_id", orderController.deleteOrder);

module.exports = router;