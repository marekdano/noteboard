import { ApolloServer, gql } from "apollo-server-lambda"

const schema = gql`
	type Note {
		content: String
	}

	type Query {
		notes: [Note]
	}
`

const resolvers = {
	Query: {
		notes: () => ([
			{ content: "Life is beatuful"},
			{ content: "Believe in yourself"}
		])
	}
}

const server = new ApolloServer({ typeDefs: schema, resolvers })

export const handler = server.createHandler({
	cors: {
		origin: "*", // for security in production, lock this to your real endpoints
		credentials: true
	}
})