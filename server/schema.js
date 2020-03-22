const { gql } = require('apollo-server');


const typeDefs = gql`
  type Product  {
    	id: Int
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
    Query: { products: () => products },
    Mutation: {
        createProd(parent, args, ctx, info) {
            const product = {
                id: products.length + 1,
                name: args.name,
                image: args.image,
                price: args.price,
                category: args.category
            }
            products.push(product)
            return product
        }
    }
};

export { typeDefs, resolvers };