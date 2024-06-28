const {PrismaClient} = require("@prisma/client");
const prisma = new PrismaClient();

const getAllProducts = async (filter = {}, orderBy = {}) => {
    return prisma.product.findMany({
        where: filter,
        orderBy: orderBy,
    });
};

const getProductById = async (id) => {
    return prisma.product.findUnique({ where: { id: parseInt(id) } });
  };
  

const createProduct = async (productData) => {
    return prisma.product.create({data: productData });
};

const updateProduct = async (id, productData) => {
    return prisma.product.update({
      where: { id: parseInt(id) },
      data: productData,
    });
  };
  


  const deleteProduct = async (id) => {
    try {
      // Check if there are any OrderItems referencing this product
      const existingOrders = await prisma.orderItem.findMany({
        where: {
          product_id: parseInt(id), // Corrected to use `product_id` instead of `productId`
        },
      });
  
      if (existingOrders.length > 0) {
        // Handle the case where there are related OrderItems
        throw new Error('Cannot delete product because it is referenced by existing orders.');
      }
  
      // If no related OrderItems, proceed with deletion
      return prisma.product.delete({ where: { id: parseInt(id) } });
    } catch (error) {
      throw new Error(`Failed to delete product: ${error.message}`);
    }
  };


module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};