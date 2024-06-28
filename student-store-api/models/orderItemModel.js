const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

const getAllOrderItems = async () => {
    return prisma.orderItem.findMany();
};

const getOrderItemsById = async (id) => {
    return prisma.orderItem.findUnique({ where: { id: parseInt(id) } });
  };
  

const createOrderItems = async (productData) => {
    return prisma.orderItem.create({data: productData });
};

const updateOrderItems = async (id, productData) => {
    return prisma.orderItem.update({
      where: { id: parseInt(id) },
      data: productData,
    });
  };
  

  const deleteOrderItems = async (id) => {
    return prisma.orderItem.delete({ where: { id: parseInt(id) } });
  };


module.exports = {
    getAllOrderItems,
    getOrderItemsById,
    createOrderItems,
    updateOrderItems,
    deleteOrderItems
}