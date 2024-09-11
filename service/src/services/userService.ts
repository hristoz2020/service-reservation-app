import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User, IUser } from '../models/userModel';

const JWT_SECRET = "trgknjsfucan93284c9rew";

interface UserInput {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export const createUser = async ({ firstName, lastName, email, password }: UserInput) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const existing = await User.findOne({
		email: new RegExp(`^${email}$`, "i"),
	});

	if (existing) {
		throw new Error("Email already exists");
	}
    const user = new User({
        firstName,
        lastName,
        email,
        password: hashedPassword
    });

    await user.save();

    return user;
};

function createSession(user: IUser) {
    return {
		email: user.email,
		_id: user._id,
		accessToken: jwt.sign(
			{
				email: user.email,
				_id: user._id,
			},
			JWT_SECRET
		),
	}; 
}