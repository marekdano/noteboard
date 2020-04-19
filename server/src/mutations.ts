import { v4 as uuidv4 } from "uuid"
import { updateItem, deleteItem } from "./dynamodb"
import { getUser } from "./queries"

type UserParams = {
	userId: string;
	username: string;
}

type CreateNoteParams = {
	userId: string;
	content: string;
}

type UpdateNoteParams = {
	userId: string;
	noteId: string;
	content: string;
}

type DeleteNoteParams = {
	userId: string;
	noteId: string;
}

export const updateUser = async (_: any, params: UserParams): Promise<User> => {
	const { userId, username } = params;
	let user = await getUser(userId);

	if (user) {
		const result = await updateItem({
			TableName: process.env.USER_TABLE!,
			Key: { userId },
			UpdateExpression: "SET username = :username, lastSignedInAt = :lastSignedInAt",
			ExpressionAttributeValues: {
				":username": username,
				":lastSignedInAt": new Date().toISOString()
			},
			ReturnValues: "ALL_NEW"
		});

		user = result.Attributes
	} else {
		const result = await updateItem({
			TableName: process.env.USER_TABLE!,
			Key: { userId },
			UpdateExpression: 
				"SET createdAt = :createdAt, username = :username, lastSignedInAt = :lastSignedInAt",
			ExpressionAttributeValues: {
				":username": username,
				":createdAt": new Date().toISOString(),
				":lastSignedInAt": new Date().toISOString()
			},
			ReturnValues: "ALL_NEW"
		});

		user = result.Attributes
	}

	return {
		userId,
		username,
		createdAt: user ? user.createdAt : null,
		lastSignedInAt: user ? user.lastSignedInAt : null
	};
}

export const createNote = async (_: any, params: CreateNoteParams) => {
	const noteId = uuidv4();
	const { userId } = params;
	const user = await getUser(userId);

	const result = await updateItem({
		TableName: process.env.NOTE_TABLE!,
		Key: {
			userId: userId,
			noteId
		},
		UpdateExpression: "SET content = :content, createdAt = :createdAt",
		ExpressionAttributeValues: {
			":content": params.content,
			":createdAt": new Date().toISOString()
		},
		ReturnValues: "ALL_NEW"
	});

	const note = result.Attributes;

	return {
		user,
		...note
	}
		
};

export const updateNote = async (_:any, params: UpdateNoteParams) => {
	const { userId, noteId, content } = params;
	const user = await getUser(userId);

	const result = await updateItem({
		TableName: process.env.NOTE_TABLE!,
		Key: {
			userId,
			noteId
		},
		UpdateExpression: "SET content = :content",
		ExpressionAttributeValues: {
			":content": content
		},
		ReturnValues: "ALL_NEW"
	});

	const note = result.Attributes;

	return {
		user,
		...note
	}
}

export const deleteNote = async (_: any, params: DeleteNoteParams) => {
	const { userId, noteId } = params;
	const user = await getUser(userId);

	const result = await deleteItem({
		TableName: process.env.NOTE_TABLE!,
		Key: { 
			userId,
			noteId
		}
	});

	const note = result.Attributes;

	return {
		user,
		...note
	}
}
