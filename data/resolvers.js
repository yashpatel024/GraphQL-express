import crypto from 'crypto';

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

let productDatabase = {};

const resolvers = {
  getProduct: ({ id }) => {
    return new Product(
      id, 
      productDatabase[id].name, 
      productDatabase[id].description, 
      productDatabase[id].price, 
      productDatabase[id].soldout, 
      productDatabase[id].inventory,
      productDatabase[id].stores
    );
  },
  createProduct: ({ input }) => {
    let id = crypto.randomBytes(10).toString('hex');
    productDatabase[id] = input;
    return new Product(
      id,
      input.name,
      input.description,
      input.price,
      input.soldout,
      input.inventory,
      input.stores
    );
  },
};

export default resolvers;
