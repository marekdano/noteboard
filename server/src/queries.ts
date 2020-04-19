import { scanItems, getItem } from "./dynamodb";

export const getUser = async (userId: string) => {
	const result = await getItem({
		TableName: process.env.USER_TABLE!,
		Key: {
			userId
		}
	});

	return result.Item;
};

export const notes = async () => {
  // TODO: add pagination because this table can get large
  const notes = await scanItems({
    TableName: process.env.NOTE_TABLE!
  });

  const result = await Promise.all(
    (notes.Items as Array<Note>).map(async (note) => {
      const user = await getUser(note.userId)
      note.user = user as User
      return note
    })
  )
  return result
};

type NoteParams = {
  userId: string;
  noteId: string;
};

export const note = async (_: any, params: NoteParams) => {
  const { userId, noteId } = params;

  const user = await getUser(userId);

  const note = await getItem({
    TableName: process.env.NOTE_TABLE!,
		Key: { 
			userId, 
			noteId 
		}
  });

  (note.Item as Note).user = <User>user

  return note.Item;
};
