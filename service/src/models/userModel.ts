import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

const UserSchema: Schema = new Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: [true, "Email is required"] },
	password: { type: String, required: true },
});

UserSchema.index(
	{ email: 1 },
	{
		collation: {
			locale: "en",
			strength: 1,
		},
	}
);

export const User = mongoose.model<IUser>("User", UserSchema);
