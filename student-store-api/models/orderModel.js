const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

const getAllOrders = async () => {
    return prisma.order.findMany({
        include: {
            OrderItems: true
        }
    });
};

const getOrderById = async (order_id) => {
    return prisma.order.findUnique({where: {order_id: parseInt(order_id)}, include: { OrderItems: true } });
}


const createOrder = async (orderData) => {
    return prisma.order.create({
      data: {
        customer_id: orderData.customer_id,
        total_price: orderData.total_price,
        status: orderData.status,
        OrderItems: {
          create: orderData.OrderItems.map(item => ({
            product_id: item.productId,
            quantity: item.quantity,
            price: item.price,
          }))
        }
      }
    });
  };

const updateOrder = async (order_id, orderData) => {
    return prisma.order.update({
        where: {order_id: parseInt(order_id)},
        data: orderData,
    });
};

const deleteOrder = async (order_id) => {
    return prisma.order.delete({where: {order_id: parseInt(order_id)}});
};


const addItemToExistingOrder = async (order_id, itemData) => {
    const orderItem = await prisma.orderItem.create({
        data: {
            order_id: parseInt(order_id),
            product_id: itemData.product_id,
            quantity: itemData.quantity,
            price: itemData.price
        }
    });

    const updatedTotal = await calculateOrderTotal(order_id);
    await prisma.order.update({
        where: { order_id: parseInt(order_id) },
        data: { total_price: updatedTotal }
    });

    return orderItem;
};


const calculateOrderTotal = async (order_id) => {
    const order = await getOrderById(order_id);
    const total = order.OrderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    return parseFloat(total.toFixed(2));
};

module.exports = {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
    addItemToExistingOrder,
    calculateOrderTotal
}