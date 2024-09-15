import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User, IUser } from "../models/userModel";

const JWT_SECRET: string = "trgknjsfucan93284c9rew";
const blackList: string[] = [];

interface UserInput {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

interface TokenPayload extends JwtPayload {
    email: string;
    _id: string;
}

export const create = async ({
	firstName,
	lastName,
	email,
	password,
}: UserInput) => {
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
		password: hashedPassword,
	});

	await user.save();

	return createSession(user);
};

export const login = async (email: string, password: string) => {
	const user = await User.findOne({ email: new RegExp(`^${email}$`, "i") });

	if (!user) {
		throw new Error("Incorrect email or password");
	}

	const match = await bcrypt.compare(password, user.password);

	if (!match) {
		throw new Error("Incorrect email or password");
	}

	return createSession(user);
};

export function logout(token: string) {
	blackList.push(token);
}


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

export function verifySession(token: string): { email: string; _id: string; token: string }  {
	if (blackList.includes(token)) {
		throw new Error("Token is invalidated");
	}

	const payload = jwt.verify(token, JWT_SECRET) as TokenPayload;  

	return {
		email: payload.email,
		_id: payload._id,
		token,
	};
}
