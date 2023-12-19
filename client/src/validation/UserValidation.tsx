import * as yup from "yup";

export const signupSchema = yup.object().shape({
	name: yup.string().required("First Name is required"),
	email: yup
		.string()
		.email("Please enter a valid email")
		.required("Email is required"),
	password: yup
		.string()
		.min(3, "Password must be at least 3 characters")
		.required("Password is required"),
});
