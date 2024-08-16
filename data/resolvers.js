import crypto from 'crypto';
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
      return new Product(
        id, 
        product.name, 
        product.description, 
        product.price, 
        product.soldout, 
        product.inventory,
        product.stores
      );
    } catch (error) {
      throw new Error(error);
    }
  },
  createProduct: async ({ input }) => {
    let id = crypto.randomBytes(10).toString('hex');
    const product = new Widget({
      name: input.name,
      description: input.description,
      price: input.price,
      soldout: input.soldout,
      inventory: input.inventory,
      stores: input.stores
    });
    try {
      await product.save();
      return new Product(
        id,
        input.name,
        input.description,
        input.price,
        input.soldout,
        input.inventory,
        input.stores
      );
    } catch (error) {
      throw new Error(error);
    }
  },
};

export default resolvers;
