import { Widget } from "./dbConnector.js";
import { Error } from "mongoose";

// In Memory DB - to demo the GraphQL API
class Product {
  constructor(id, name, description, price, soldout, inventory, stores) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.soldout = soldout;
    this.inventory = inventory;
    this.stores = stores;
  }
}

const resolvers = {
  getProduct: async ({ id }) => {
    try {
      const product = await Widget.findById(id);
      return product;
    } catch (error) {
      throw new Error(error);
    }
  },
  createProduct: async ({ input }) => {
    const product = new Widget({
      name: input.name,
      description: input.description,
      price: input.price,
      soldout: input.soldout,
      inventory: input.inventory,
      stores: input.stores
    });

    product.id = product._id;

    try {
      await product.save();
      return product;
    } catch (error) {
      throw new Error(error);
    }
  },
  updateProduct: async ({ input }) => {
    try {
      const updateProduct = await Widget.findByIdAndUpdate({_id: input.id}, input, {new: true});
      return updateProduct;
    } catch (error) {
      throw new Error(error);
    }
  },
};

export default resolvers;
