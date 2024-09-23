import { BASE_URL, REGISTER } from "./config";

export interface FormData {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	confirmPassword: string;
}

export const registerUser = async (formData: FormData) => {
	try {
		const response = await fetch(BASE_URL + REGISTER, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		});

		const data = await response.json();

		return data;
	} catch (error) {
		throw new Error(error.message);
	}
};
