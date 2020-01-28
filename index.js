const { ApolloServer, gql } = require('apollo-server');

// The GraphQL schema
const typeDefs = gql`
  type Query {
    "A simple type for getting started!"
    hello: String
  }
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
}
type Mutation {
    singleUpload(file: Upload!): File!
}
`;

// A map of functions which return data for the schema.
const resolvers = {
	Query: {
		hello: () => 'world'
	},
	Mutation: {
		singleUpload: async (_root, { file }) => {
			const { stream, filename, mimetype, encoding } = await file;

			// 1. Validate file metadata.

			// 2. Stream file contents into cloud storage:
			// https://nodejs.org/api/stream.html

			// 3. Record the file upload in your DB.
			// const id = await recordFile( … )

			return { filename, mimetype, encoding };
		}
	}
};

const server = new ApolloServer({
	typeDefs,
	resolvers
});

server.listen().then(({ url }) => {
	console.log(`🚀 Server ready at ${url}`);
});
