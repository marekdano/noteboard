type User = {
	userId: string;
	username: string;
	createdAt: Date | string;
	lastSignedInAt: Date | string;
};

type Note = {
	user: User;
	userId: string;
	noteId: string;
	content: string;
	createdAt: string;
}
