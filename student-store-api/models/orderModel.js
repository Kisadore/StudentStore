const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

const getAllOrders = async () => {
    return prisma.order.findMany();
};

const getOrderById = async (order_id) => {
    return prisma.order.findUnique({where: {order_id: parseInt(order_id)}});
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

module.exports = {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder
}