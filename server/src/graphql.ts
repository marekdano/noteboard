import { ApolloServer, gql } from "apollo-server-lambda"

import { updateUser } from "./mutations";

const schema = gql`
	type Note {
		content: String
	}

	type User {
		userId: String
		createdAt: String
		lastSignedInAt: String
	}

	type Query {
		notes: [Note]
	}

	type Mutation {
		updateUser(userId: String): User
	}
`

const resolvers = {
	Query: {
		notes: () => ([
			{ content: "Life is beatuful"},
			{ content: "Believe in yourself"}
		])
	},
	Mutation: {
		updateUser
}
}

const server = new ApolloServer({ typeDefs: schema, resolvers })

export const handler = server.createHandler({
	cors: {
		origin: "*", // for security in production, lock this to your real endpoints
		credentials: true
	}
})