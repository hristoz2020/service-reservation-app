import { useState } from "react";
import { registerUser } from "../services/registerUser";

const Register = () => {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [serverMessage, setServerMessage] = useState<string | null>(null);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const data = await registerUser(formData);
		setServerMessage(data.errors);
		setFormData({
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			confirmPassword: "",
		});
	};

	return (
		<form className="registration-form" onSubmit={handleSubmit}>
			<h2>Registration</h2>

			<div className="form-group">
				<label htmlFor="firstName">First Name</label>
				<input
					type="text"
					id="firstName"
					name="firstName"
					value={formData.firstName}
					onChange={handleInputChange}
				/>
			</div>

			<div className="form-group">
				<label htmlFor="lastName">Last Name</label>
				<input
					type="text"
					id="lastName"
					name="lastName"
					value={formData.lastName}
					onChange={handleInputChange}
				/>
			</div>

			<div className="form-group">
				<label htmlFor="email">Email</label>
				<input
					type="email"
					id="email"
					name="email"
					value={formData.email}
					onChange={handleInputChange}
				/>
			</div>

			<div className="form-group">
				<label htmlFor="password">Password</label>
				<input
					type="password"
					id="password"
					name="password"
					value={formData.password}
					onChange={handleInputChange}
				/>
			</div>

			<div className="form-group">
				<label htmlFor="confirmPassword">Confirm Password</label>
				<input
					type="password"
					id="confirmPassword"
					name="confirmPassword"
					value={formData.confirmPassword}
					onChange={handleInputChange}
				/>
			</div>
			{serverMessage?.length > 0 && <p>{serverMessage}</p>}
			<button type="submit">Register</button>
		</form>
	);
};

export default Register;
