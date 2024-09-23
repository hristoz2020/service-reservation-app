import { useState } from "react";
import { registerUser } from "../services/registerUser";
import { FormData } from "../services/registerUser";

const Register = () => {
	const [formData, setFormData] = useState<FormData>({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [serverMessage, setServerMessage] = useState<FormData | null>(null);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const data = await registerUser(formData);
		data.errors
			? setServerMessage(data.errors)
			: setFormData({
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
				{serverMessage?.firstName && (
					<p className="error">{serverMessage?.firstName}</p>
				)}
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
				{serverMessage?.lastName && (
					<p className="error">{serverMessage?.lastName}</p>
				)}
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
				{serverMessage?.email && (
					<p className="error">{serverMessage?.email}</p>
				)}
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
				{serverMessage?.password && (
					<p className="error">{serverMessage?.password}</p>
				)}
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
			<button type="submit">Register</button>
		</form>
	);
};

export default Register;
