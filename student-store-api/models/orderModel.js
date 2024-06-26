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
    //add include orderitems
};

const createOrder = async (orderData) => {
    return prisma.order.create({data: orderData});
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
const AddItemToExistingOrder = async (order_id, itemData) => {
    const order = await getOrderById(order_id);
    if (!order){
        throw new Error("Order not found");
    }
    return prisma.orderItem.create({
        data:{
            order_id: parseInt(order_id),
            ...itemData
        }
    });
};

const calculateOrderTotal = async (order_id) => {
    const order = await getOrderById(order_id);
    if (!order) {
        throw new Error("Order not found");
    }
    const total = order.OrderItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    return total;
};

module.exports = {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
    AddItemToExistingOrder,
    calculateOrderTotal
}