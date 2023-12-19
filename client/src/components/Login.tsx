import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import { setSessionStorageKey } from "../utils/Session";
import { getAllUsers } from "../services/user";
import { login } from "../services/api";
type Props = {};
const Login = (props: Props) => {
	const navigate = useNavigate();
	const formRef = useRef<HTMLFormElement>(null);
	const [isFormValid, setIsFormValid] = useState<boolean>(false);

	const wrongCredentialsAlert = () =>
		toast.error("Wrong credentials", {
			position: "top-center",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "light",
		});

	const handleChange = () => {
		setIsFormValid(formRef.current?.checkValidity() ?? false);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!formRef.current) return;

		const formData = new FormData(formRef.current);
		const username = formData.get("username") as string;
		const password = formData.get("password") as string;
		try {
			const response = await login(username, password);

			// Handle successful login, e.g., store token in session storage
			// You may want to handle this differently based on your application's structure
			// Example:
			if (response.token) {
				// Store token in session storage
				setSessionStorageKey("authToken", response.token);

				// Redirect to the home page or any other route
				navigate("/");
			} else {
				// Handle case where token is not received
				wrongCredentialsAlert();
			}
		} catch (error) {
			// Handle error, e.g., show an error toast
			console.error("Error during login:", error);
			wrongCredentialsAlert();
		}
	};

	return (
		<div className="h-screen">
			<ToastContainer />
			<div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
				<h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
					Sign In
				</h1>
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<form ref={formRef} onSubmit={handleSubmit}>
						<div>
							<label className="block text-sm font-medium leading-6 text-gray-900">
								Username*
							</label>
							<div className="my-4">
								<input
									id="username"
									name="username"
									type="text"
									required
									onChange={handleChange}
									className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
								/>
							</div>
							<div className="flex items-center justify-between my-2">
								<label className="block text-sm font-medium leading-6 text-gray-900">
									Password
								</label>
								<div className="text-sm">
									<a
										href="/"
										className="font-semibold text-blue-600 hover:text-blue-500"
									>
										Forgot password?
									</a>
								</div>
							</div>
							<div className="my-2">
								<input
									id="password"
									name="password"
									onChange={handleChange}
									type="password"
									required
									className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>
						<div className="mt-8">
							<button
								type="submit"
								className="flex w-full disabled:bg-gray-300 disabled:text-gray-100 justify-center rounded-md bg-gray-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
								disabled={!isFormValid}
							>
								Sign in
							</button>
						</div>
					</form>
				</div>
				<div className="mt-2">
					<p className="text-center text-sm text-gray-500">
						Don't have an account?
						<Link
							to="/signup"
							className="font-semibold leading-6 text-blue-600 hover:text-blue-500"
						>
							Sign up
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Login;
