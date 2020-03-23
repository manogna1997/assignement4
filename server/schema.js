const { gql } = require('apollo-server');
const {Product} = require('./models/products.module.js');

const typeDefs = gql`
  type Product  {
        id: ID,
    	category: Category!
    	name: String!
    	price: Float
    	image: String
  }
  enum Category {
        Shirts
        Jeans
        Jackets
        Sweaters
        Accessories 
  }
  type Query {
    products: [Product]
  }
  type Mutation{
        createProd(name: String!,price: Float, image: String,category: Category!): Product!
    }
`;
const products = [];
// The resolvers
const resolvers = {
    Query: { products: () => Product.find({}), },
    Mutation: {
        createProd(parent, args, ctx, info) {
            const product = new Product({
                // id: products.length + 1,
                name: args.name,
                image: args.image,
                price: args.price,
                category: args.category
            });
            return  product.save();
        }
    }
};

export { typeDefs, resolvers };