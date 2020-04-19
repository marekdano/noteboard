import { ApolloServer, gql } from "apollo-server-lambda"

import { updateUser, createNote, updateNote, deleteNote } from "./mutations";
import { notes, note } from "./queries";

const schema = gql`
	type User {
		userId: String
		username: String
		createdAt: String
		lastSignedInAt: String
	}

	type Note {
		user: User
		userId: String
		noteId: String
		content: String
		createdAt: String
	}

	type Query {
		notes: [Note]
		note(userId: String, noteId: String): Note
	}

	type Mutation {
		updateUser(userId: String, username: String): User
		createNote(userId: String, content: String): Note
		updateNote(userId: String, noteId: String, content: String): Note
		deleteNote(userId: String, noteId: String): Note
	}
`

const resolvers = {
	Query: {
		notes,
		note
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