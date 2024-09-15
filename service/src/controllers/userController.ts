import { Request, Response } from "express";
import { create, login, logout } from "../services/userService";
import { mapErrors } from "../utils/mappers";

export const registerUser = async (req: Request, res: Response) => {
	const { firstName, lastName, email, password, confirmPassword } = req.body;

	const errors: string[] = [];

	if (!firstName) {
		errors.push("First name is required");
	}
	if (!lastName) {
		errors.push("Last name is required");
	}
	if (!email || !/\S+@\S+\.\S+/.test(email)) {
		errors.push("Invalid email");
	}
	if (!password || password.length < 6) {
		errors.push("Password must be at least 6 characters long");
	}
	if (errors.length > 0) {
		return res.status(400).json({ errors });
	}
	if (password !== confirmPassword) {
		errors.push("Passwords must match");
	}

	try {
		const user = await create({ firstName, lastName, email, password });
		res.status(201).json({ message: "User registered successfully", user });
	} catch (error) {
		res.status(500).json({ message: "Error registering user", error });
	}
};

export const loginUser = async (req: Request, res: Response) => {
	const { email, password } = req.body;

	try {
		const result = await login(email.trim().toLowerCase(), password.trim());
		res.json(result);
	} catch (err: unknown) {
		if (err instanceof Error) {
			console.error(err.message);
		}
		const error = mapErrors(err);
		res.status(400).json({ message: error });
	}
};
