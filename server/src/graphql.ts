import { ApolloServer, gql } from "apollo-server-lambda"

import { updateUser, createNote, updateNote, deleteNote } from "./mutations";

const schema = gql`
	type User {
		userId: String
		createdAt: String
		lastSignedInAt: String
	}

	type Note {
		userId: String
		noteId: String
		content: String
		createdAt: String
	}

	type Query {
		notes: [Note]
	}

	type Mutation {
		updateUser(userId: String): User
		createNote(userId: String, content: String): Note
		updateNote(userId: String, noteId: String, content: String): Note
		deleteNote(userId: String, noteId: String): Note
	}
`

const resolvers = {
	Query: {
		notes: () => ([
			{ 
				userId: 1,
				noteId: 1,
				content: "Life is beatuful",
				createdAt: "2020-10-10T00:00:00Z"
			},
			{ 
				userId: 1,
				noteId: 2,
				content: "Believe in yourself",
				createdAt: "2020-11-11T00:00:00Z"
			}
		])
	},
	Mutation: {
		updateUser,
		createNote,
		updateNote,
		deleteNote
	}
}

const server = new ApolloServer({ typeDefs: schema, resolvers })

export const handler = server.createHandler({
	cors: {
		origin: "*", // for security in production, lock this to your real endpoints
		credentials: true
	}
})