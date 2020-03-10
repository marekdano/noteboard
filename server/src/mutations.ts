import { getItem, updateItem } from "./dynamodb"
import { v4 as uuidv4 } from "uuid"

type UserParams = {
	userId: string;
}

type CreateNoteParams = {
	userId: string;
	content: string;
}

export const updateUser = async (_: any, params: UserParams): Promise<User> => {
	const { userId } = params;

	let result = await getItem({
		TableName: process.env.USER_TABLE!,
		Key: {
			userId
		}
	});

	let user = result.Item;

	if (user) {
		const result = await updateItem({
			TableName: process.env.USER_TABLE!,
			Key: { userId },
			UpdateExpression: "SET lastSignedInAt = :lastSignedInAt",
			ExpressionAttributeValues: {
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
				"SET createdAt = :createdAt, lastSignedInAt = :lastSignedInAt",
			ExpressionAttributeValues: {
				":createdAt": new Date().toISOString(),
				":lastSignedInAt": new Date().toISOString()
			},
			ReturnValues: "ALL_NEW"
		});

		user = result.Attributes
	}

	return {
		userId,
		createdAt: user ? user.createdAt : null,
		lastSignedInAt: user ? user.lastSignedInAt : null
	};
}

export const createNote = async (_: any, params: CreateNoteParams) => {
	const noteId = uuidv4();

	const result = await updateItem({
		TableName: process.env.NOTE_TABLE!,
		Key: {
			userId: params.userId,
			noteId
		},
		UpdateExpression: "SET content = :content, createdAt = :createdAt",
		ExpressionAttributeValues: {
			":content": params.content,
			":createdAt": new Date().toISOString()
		},
		ReturnValues: "ALL_NEW"
	});

	return result.Attributes;
};
