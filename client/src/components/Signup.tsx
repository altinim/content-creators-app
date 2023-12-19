import React, { useState } from "react";
import * as yup from "yup";
import { signupSchema } from "../validation/UserValidation";
import kosovoCities from "../data/kosovoCities";
import { useNavigate } from "react-router-dom";
import { createUser as createUserService } from "../services/user";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Props = {};

const Signup: React.FC<Props> = (props: Props) => {
	const navigate = useNavigate();

	const [formData, setFormData] = useState<{
		name: string;
		username: string;
		email: string;
		password: string;
	}>({
		name: "",
		username: "",
		email: "",
		password: "",
	});

	const [errors, setErrors] = useState<{
		name?: string;
		username?: string;
		email?: string;
		password?: string;
	}>({});
	const registerSuccessfullyAlert = () =>
		toast.success("Successfully registered", {
			position: "top-center",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "light",
		});
	const userAlreadyExists = () => {
		toast.error("User with the same email already exists", {
			position: "top-center",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "light",
		});
	};

	let inputStyle: string = `
	block w-full rounded-md px-3.5 py-2 m-0 text-gray-900
	bg-opacity-20 backdrop-blur-md bg-gray-100
	shadow-sm ring-1 ring-inset ring-gray-300
	placeholder:text-gray-400 focus:ring-1 focus:ring-blue-500
	sm:text-sm sm:leading-6
  `;
	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setFormData((prevData) => ({ ...prevData, [name]: value }));
	};

	const isFormDataValid = () => {
		return Object.values(formData).every((value) => Boolean(value));
	};
	const createUser = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			await signupSchema.validate(formData, { abortEarly: false });
			setErrors({});
			createUserService(formData)
				.then(() => {
					registerSuccessfullyAlert();
					navigate("/signin");
				})
				.catch((error) => {
					throw error;
				});
		} catch (error) {
			if (error instanceof yup.ValidationError) {
				const newErrors = error.inner.reduce(
					(acc, err) => ({
						...acc,
						[err.path as string]: err.message,
					}),
					{}
				);
				setErrors(newErrors);
			}
		}
	};

	return (
		<div>
			<div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
				<h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
					Sign up
				</h1>
				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<form
						className="space-y-6"
						onSubmit={createUser}
						noValidate
					>
						<ToastContainer />
						<div className="w-full">
							<label className="block text-sm font-medium leading-6 text-gray-900">
								Name*
							</label>
							<div className="mt-2">
								<input
									id="name"
									name="name"
									value={formData.name}
									onChange={handleInputChange}
									type="text"
									className={
										inputStyle +
										`${
											errors.name
												? " ring-red-500"
												: " ring-gray-300"
										}`
									}
								/>
								{errors.name && (
									<small className="text-red-600 m-0">
										{errors.name}
									</small>
								)}
							</div>
						</div>

						<div className="w-full">
							<label className="block text-sm font-medium leading-6 text-gray-900">
								Username*
							</label>
							<div className="mt-2">
								<input
									id="username"
									name="username"
									type="text"
									value={formData.username}
									onChange={handleInputChange}
									className={
										inputStyle +
										`${
											errors.username
												? " ring-red-500"
												: " ring-gray-300"
										}`
									}
								/>
							</div>
						</div>
						<div>
							<label className="block text-sm font-medium leading-6 text-gray-900">
								Email address*
							</label>
							<div>
								<input
									value={formData.email}
									onChange={handleInputChange}
									name="email"
									type="email"
									id="email"
									className={
										inputStyle +
										`${
											errors.email
												? " ring-red-500"
												: " ring-gray-300"
										}`
									}
									formNoValidate
								/>
								{errors.email && (
									<small className="text-red-600">
										{errors.email}
									</small>
								)}
							</div>
						</div>
						<div>
							<div className="flex items-center justify-between">
								<label className="block text-sm font-medium leading-6 text-gray-900">
									Password*
								</label>
							</div>
							<div>
								<input
									id="password"
									name="password"
									type="password"
									value={formData.password}
									onChange={handleInputChange}
									className={
										inputStyle +
										`${
											errors.password
												? " ring-red-500"
												: " ring-gray-300"
										}`
									}
								/>
								{errors.password && (
									<small className="text-red-600">
										{errors.password}
									</small>
								)}
							</div>
						</div>
						<div>
							<button
								type="submit"
								className="flex w-full disabled:bg-gray-300 disabled:text-gray-100 justify-center rounded-md bg-gray-800 px-3 py-1.5 text-sm font-semibold leading-6 disabled:text-red text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
								disabled={!isFormDataValid()}
							>
								Sign up
							</button>
						</div>
					</form>
				</div>
				<div className="mt-2">
					<p className="mt-10 text-center text-sm text-gray-500">
						Already have an account?
						<a
							href="/"
							className="font-semibold leading-6 pl-2 text-blue-600 hover:text-blue-500"
						>
							Sign in
						</a>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Signup;
