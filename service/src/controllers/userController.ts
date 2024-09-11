import { Request, Response } from "express";
import { createUser } from "../services/userService";

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
		const user = await createUser({ firstName, lastName, email, password });
		res.status(201).json({ message: "User registered successfully", user });
	} catch (error) {
		res.status(500).json({ message: "Error registering user", error });
	}
};
